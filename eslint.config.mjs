import prettierConfig from 'eslint-plugin-prettier/recommended'

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  prettierConfig,
  rules: {
    // TODO: consider turning this back on
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 2
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 2
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 2
        }
      }
    ]
  }
})
