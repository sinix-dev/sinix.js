module.exports = {
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
    "quotes": ["error", "double"],
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": ["error", "never"],
    "prefer-promise-reject-errors": "off"
  },
  "env": {
    "node": true,
    "es2021": true,
    "browser": true,
  },
  "extends": "eslint:recommended"
}