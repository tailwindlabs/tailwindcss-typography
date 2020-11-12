const isPlainObject = require('lodash/isPlainObject')

module.exports = {
  isUsableColor(color, values) {
    return isPlainObject(values) && color !== 'gray' && values[600]
  },
}
