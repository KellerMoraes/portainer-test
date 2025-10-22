import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";


export default [
  {languageOptions: { globals: globals.browser }, rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: ["error", 4],
    'comma-spacing': ["error", {before: false, after: true}],
    'vue/no-multi-space': 0,
    'vue/require-prop-types': 'off',
    "vue/component-definition-name-casing": ["error", "PascalCase" | "kebab-case"],


    
        }},
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  
];