const rootConfig = require("../../../.config/jest.config")

module.exports = {
  ...rootConfig,
  moduleNameMapper: {
    "^csv-stringify/sync": "<rootDir>/node_modules/csv-stringify/dist/cjs/sync.cjs"
  }
}
