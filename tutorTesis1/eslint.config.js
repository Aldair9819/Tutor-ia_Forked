import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"],
    rules: {
      "indent": ["error", 2], // Regla de indentación, aquí usamos 2 espacios
    },
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  
];
