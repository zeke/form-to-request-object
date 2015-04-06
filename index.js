var steeltoe = require('steeltoe')

module.exports = function formToRequestObject ($el) {
  var opts = {
    method: $el.attr('method').toUpperCase(),
    url: $el.attr('action'),
    json: true,
    data: {}
  }

  // set deep properties like 'package.repsository.url'
  $el.serializeArray().forEach(function (input) {
    steeltoe(opts.data).set(input.name, input.value)
  })

  // attach crsf token if available
  if (window && window.crumb) {
    opts.data.crumb = window.crumb
    opts.headers = {'x-csrf-token': window.crumb}
  }

  if (!Object.keys(opts.data).length) {
    delete opts.data
  }

  return opts
}
