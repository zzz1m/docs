import oxlint from 'eslint-plugin-oxlint'
import antfu from '@antfu/eslint-config'

// export default {
//   root: true,
//   extends: ["@nuxt/eslint-config", "plugin:oxlint/recommended"],
//   rules: {
//     // Global
//     semi: ["error", "never"],
//     quotes: ["error", "single"],
//     "quote-props": ["error", "as-needed"],
//     // Vue
//     "vue/multi-word-component-names": 0,
//     "vue/max-attributes-per-line": "off",
//     "vue/no-v-html": 0,
//   },
// };

export default antfu(
  {
    vue: true,
    stylistic: {
      quotes: 'single',
    },
    ignores: [
      'dist',
      'node_modules',
      '.output',
      '.nuxt',
    ],
  },
  oxlint.configs['flat/recommended'], // oxlint should be the last one
)
