const SPLIT_REGEX = /([a-z\d])([A-Z])|[-_\s]+/g

const pascalCaseRegex = /^[A-Z][a-zA-Z0-9]*$/
const singleWordRegex = /^[A-Z][a-z0-9]*$/

function checkPrefixRegex(prefix, name) {
  return new RegExp(`^${prefix}[A-Z]`).test(name)
}

function camelCase(name) {
  if (!name) return ''
  const words = name.replace(SPLIT_REGEX, '$1 $2').split(' ').filter(Boolean)

  return words
    .map((word, i) =>
      i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('')
}

function constantCase(name) {
  if (!name) return ''
  return name
    .replace(SPLIT_REGEX, '$1 $2')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.toUpperCase())
    .join('_')
}

function removeViewText(name) {
  if (!name) return ''
  const withoutView = name.replace(/View$/, '')
  return withoutView.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
}

const srcCategories = [
  {
    category: 'src/components/atoms',
    value: 'AtomComponent',
  },
  {
    category: 'src/components/molecules',
    value: 'MoleculeComponent',
  },
  {
    category: 'src/components/organisms',
    value: 'OrganismComponent',
  },
  {
    category: 'src/components/templates',
    value: 'TemplateComponent',
  },
  {
    category: 'src/views',
    value: 'ComponentView',
  },
]

function getCategoryValue(category) {
  return srcCategories.find((item) => category.includes(item.category))
}

module.exports = function (plop) {
  plop.setHelper('eq', (a, b) => a === b)
  plop.setHelper('hasModelValue', (props) => {
    return Array.isArray(props) && props.some((p) => p.propName === 'modelValue')
  })
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
            {
              name: '(Templates) : (src/components/templates/)',
              value: 'src/components/templates/',
            },
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
          default: (answer) => {
            return getCategoryValue(answer.category).value
          },
          when: (answers) => answers.category !== 'custom',
          validate: (input, answers) => {
            const name = input.trim()
            if (!name) return 'Component name cannot be empty'
            if (!pascalCaseRegex.test(name)) return 'Component name must be in PascalCase'
            if (singleWordRegex.test(name))
              return 'Component name must be composed of at least two words'

            const { category } = answers
            const isView = category?.includes('src/views/')
            const config = getCategoryValue(category)

            // Fallback if category not found
            if (!config) return true

            const atomicValue = config.value
            // Extract singular prefix: "AtomComponent" → "Atom", "ComponentView" → "" (handled separately)
            const prefix = atomicValue.replace('Component', '')
            const isGeneric = atomicValue === 'ComponentView' // Special case for views helper value

            if (isView) {
              if (!name.endsWith('View'))
                return 'Component name in views must have "View" suffix (e.g., HomeView)'
            } else if (!isGeneric && prefix) {
              // Enforce singular prefix (e.g., must start with "Atom", not "Atoms")
              if (!name.startsWith(prefix) || !checkPrefixRegex(prefix, name)) {
                return `Component name must start with "${prefix}" (e.g., ${prefix}Button)`
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
        result.push({
          type: 'modify',
          path: 'src/router/index.ts',
          pattern: /\/\/ plop:inject-routes-component-do-not-removed/g,
          template: `{\n    path: ROUTES.${constantCase(data.name)}.path,\n    name: ROUTES.${constantCase(data.name)}.name,\n    component: () => import('@/views/${data.name}'),\n    meta: {\n      layout: 'DefaultLayout',\n    },\n  },\n  // plop:inject-routes-component-do-not-removed`,
        })

        result.push({
          type: 'modify',
          path: 'src/constants/routes.ts',
          pattern: /\/\/ plop:inject-routes-do-not-removed/g,
          template: `${constantCase(data.name)}: { name: '${camelCase(removeViewText(data.name))}', path: '/${removeViewText(data.name)}' },\n  // plop:inject-routes-do-not-removed`,
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
