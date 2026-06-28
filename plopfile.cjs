module.exports = function (plop) {
  plop.setHelper('eq', (a, b) => a === b)
  plop.setGenerator('component', {
    description: 'Create a Vue component with spec and story',

    prompts: async function (inquirer) {
      const basicAnswers = await inquirer.prompt([
        {
          type: 'list',
          name: 'category',
          message: 'Where should this component live?',
          choices: [
            { name: '(Atoms)     : (src/components/atoms/)', value: 'src/components/atoms/' },
            {
              name: '(Molecules) : (src/components/molecules/)',
              value: 'src/components/molecules/',
            },
            {
              name: '(Organisms) : (src/components/organisms/)',
              value: 'src/components/organisms/',
            },
            { name: '(Layouts)   : (src/layouts/)', value: 'src/layouts/' },
            { name: '(Views)     : (src/views/)', value: 'src/views/' },
            { name: 'Custom Path', value: 'custom' },
          ],
        },
        {
          type: 'input',
          name: 'componentName',
          message: (answer) =>
            answer.category.includes('src/views/')
              ? 'What is the view/page name?'
              : 'What is the component name?',
          default: (answer) =>
            answer.category.includes('src/views/') ? 'HomeView' : 'MyComponent',
          when: (answers) => answers.category !== 'custom',
          validate: (input, answers) => {
            if (!input.trim()) return 'Component name cannot be empty'

            const isView = answers.category.includes('src/views/')

            const pascalCaseRegex = /^[A-Z][a-zA-Z0-9]*$/
            if (!pascalCaseRegex.test(input)) {
              return `Component name must be in PascalCase (e.g., ${isView ? 'HomeView' : 'MyComponent'})`
            }

            if (answers.category && isView) {
              if (!input.endsWith('View')) {
                return 'Component in views must have "View" suffix (e.g., HomeView)'
              }
            }

            return true
          },
        },
        {
          type: 'input',
          name: 'path',
          message: 'Destination path for the component:',
          default: 'src/components/MyComponent',
          when: (answers) => answers.category === 'custom',
          validate: (input) => {
            if (!input.trim()) return 'Path cannot be empty'

            if (input.includes('src/views/')) {
              const fileName = input.split('/').pop()
              const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '')

              if (!nameWithoutExt.endsWith('View')) {
                return 'Components in "src/views/" must have a "View" suffix (e.g., HomeView)'
              }
            }

            return true
          },
        },
        {
          type: 'confirm',
          name: 'hasProp',
          message: 'Does this component require props?',
          default: true,
        },
      ])

      const propsList = []

      if (basicAnswers.hasProp) {
        let addAnother = true
        while (addAnother) {
          const propAnswers = await inquirer.prompt([
            {
              type: 'input',
              name: 'propName',
              message: 'Enter the prop name:',
              validate: (input) => {
                if (!input.trim()) return 'Prop name cannot be empty'
                if (!/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(input)) {
                  return 'Prop name must be a valid JavaScript identifier'
                }
                return true
              },
            },
            {
              type: 'list',
              name: 'propType',
              message: 'Select the prop TypeScript type:',
              choices: ['string', 'number', 'boolean', 'object', 'array', 'function'],
              default: 'string',
            },
            {
              type: 'list',
              name: 'arrayType',
              message: 'Enter the custom type name:',
              when: (answers) => answers.propType === 'array',
              choices: ['string', 'number', 'boolean', 'object'],
              default: 'string',
            },
          ])

          const finalType =
            propAnswers.propType === 'array' ? `${propAnswers.arrayType}[]` : propAnswers.propType

          propsList.push({
            propName: propAnswers.propName,
            propType: finalType,
          })

          const { addMore } = await inquirer.prompt({
            type: 'confirm',
            name: 'addMore',
            message: 'Add another prop?',
            default: false,
          })

          addAnother = addMore
        }
      }

      return {
        ...basicAnswers,
        props: propsList,
      }
    },

    actions: (data) => {
      if (data.category) {
        data.path = `${data.category}${data.componentName}`
      }
      data.name = data.path.split('/').pop()

      const result = [
        {
          type: 'add',
          path: '{{path}}/{{pascalCase name}}.vue',
          templateFile: '.plop-templates/component/component.vue.hbs',
        },
        {
          type: 'add',
          path: '{{path}}/{{pascalCase name}}.spec.ts',
          templateFile: '.plop-templates/component/component.spec.ts.hbs',
        },
        {
          type: 'add',
          path: '{{path}}/{{pascalCase name}}.stories.ts',
          templateFile: '.plop-templates/component/component.stories.ts.hbs',
        },
        {
          type: 'add',
          path: '{{path}}/index.ts',
          templateFile: '.plop-templates/component/index.ts.hbs',
        },
      ]

      if (data.path.includes('/views/')) {
        const constantCase = (name) =>
          name
            .replace(/([a-z\d])([A-Z])/g, '$1_$2')
            .replace(/[-\s]/g, '_')
            .toUpperCase()

        const removeViewText = (name) => {
          return name
            .replace(/View$/, '')
            .replace(/([a-z\d])([A-Z])/g, '$1-$2')
            .toLowerCase()
        }
        result.push({
          type: 'modify',
          path: 'src/router/index.ts',
          transform: (template) => {
            const newRoute = `  {
    path: ROUTES.${constantCase(data.name)}.path,
    name: ROUTES.${constantCase(data.name)}.name,
    component: () => import('@/views/${data.name}'),
    meta: {
      layout: 'DefaultLayout',
    },
  },`

            const lines = template.split('\n')
            const lastBracketIndex = lines.lastIndexOf(']')
            let insertIndex = lastBracketIndex

            for (let i = lastBracketIndex - 1; i >= 0; i--) {
              if (lines[i].trim().startsWith('}')) {
                insertIndex = i + 1
                break
              }
            }

            lines.splice(insertIndex, 0, newRoute)
            return lines.join('\n')
          },
        })

        result.push({
          type: 'modify',
          path: 'src/constants/routes.ts',
          transform: (template) => {
            const newConstant = `  ${constantCase(data.name)}: { name: '${data.name.toLowerCase()}', path: '/${removeViewText(data.name)}' },`

            const lines = template.split('\n')

            let routesObjectEndIndex = -1

            for (let i = 0; i < lines.length; i++) {
              if (lines[i].trim() === '} as const') {
                routesObjectEndIndex = i
                break
              }
            }

            if (routesObjectEndIndex === -1) {
              console.error('Could not find "} as const" for ROUTES object.')
              return template
            }

            let insertIndex = routesObjectEndIndex

            for (let i = routesObjectEndIndex - 1; i >= 0; i--) {
              if (lines[i].includes(':')) {
                insertIndex = i + 1
                break
              }
            }

            lines.splice(insertIndex, 0, newConstant)
            return lines.join('\n')
          },
        })

        result.push({
          type: 'add',
          path: 'e2e/{{pascalCase name}}.spec.ts',
          templateFile: '.plop-templates/e2e/component.spec.ts.hbs',
        })
      }

      return result
    },
  })
}
