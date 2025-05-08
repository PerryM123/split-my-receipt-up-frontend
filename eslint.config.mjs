// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        minProperties: 2
      }
    ]
  }
})
