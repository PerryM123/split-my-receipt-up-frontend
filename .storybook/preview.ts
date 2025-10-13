import type { Preview } from '@storybook-vue/nuxt'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    viewport: {
      options: INITIAL_VIEWPORTS
    },
    initialGlobals: {
      viewport: { value: 'mobile2', isRotated: false }
    }
  }
}

export default preview
