const isPlainObject = require('lodash.isplainobject')

module.exports = {
  isUsableColor(color, values) {
    return isPlainObject(values) && color !== 'gray' && values[600]
  },
}
