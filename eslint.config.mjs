// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// TODO: エラーが発生してるようで別途で対応が必要
// import storybook from 'eslint-plugin-storybook'

import prettier from 'eslint-plugin-prettier'

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  plugins: {
    prettier
  },
  rules: {
    // TODO: consider turning this back on
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    'object-curly-newline': 'off'
  }
})
