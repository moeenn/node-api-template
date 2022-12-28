module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  "rules": {
    "quotes": [2, "double", { 
      "allowTemplateLiterals": true,
      "avoidEscape": true 
    }],
    "semi": ["error", "never"],
    // "require-await": 2,          // TODO: consider enabling
  }
};
