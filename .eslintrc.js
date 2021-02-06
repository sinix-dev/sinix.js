module.exports = {
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "semi": ["error", "never"],
    "array-bracket-spacing": [
      "error",
      "never"
    ],
    "no-trailing-spaces": "error",
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "indent": [
      "error",
      2
    ],
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true
      }
    ],
    "keyword-spacing": "off",
    "quotes": ["error", "double"],
    "camelcase": "off",
    "no-console": "off",
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": ["error", "never"],
    "prefer-promise-reject-errors": "off"
  },
  "env": {
    "node": false
  },
  "extends": "eslint:recommended"
}