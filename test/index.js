var $ = require('jquery')
var test = require('tape')
var domify = require('domify')
var fs = require('fs')
var template = domify(fs.readFileSync(__dirname + '/template.html', 'utf8'))
var formToRequestObject = require('..')

$(function () {
  document.body.appendChild(template)

  test('GET', function(t) {
    var form = formToRequestObject($("form#get"))
    t.plan(3)
    t.equal(form.method, "GET", "derives (capitalized) method")
    t.equal(form.url, "https://toasters.com/123", "derives url")
    t.equal(form.data, undefined, "doesn't have a data property")
  })

  test('POST', function(t) {
    var form = formToRequestObject($("form#post"))
    t.plan(3)
    t.equal(form.method, "POST", "derives method")
    t.equal(form.url, "https://toasters.com/", "derives url")
    t.deepEqual(form.data, {toaster: {color: "beige", level: "2"}}, "derives data")
  })

  test('CSRF', function(t) {
    window.crumb = "123xyz"
    var form = formToRequestObject($("form#post"))
    t.plan(1)
    t.equal(form.data.crumb, "123xyz", "borrows csrf token from from window, if available")
  })

  test('shutdown', function(t) {
    t.end()
  })
})
