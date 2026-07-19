import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3-vite'
import { createPinia } from 'pinia'
import '@/style.css'

setup((app) => {
  app.use(createPinia())
})

const preview: Preview = {
  decorators: [
    (story) => ({
      components: { story },
      template: '<Suspense><story /></Suspense>',
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
