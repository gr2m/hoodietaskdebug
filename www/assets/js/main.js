"use strict";
// initialize Hoodie
var hoodie  = new Hoodie();
var $successButton = $('#test-success');
var $failButton = $('#test-fail');
$successButton.on('click', function() {
  var promise = hoodie.task.start('test', {foo: 'bar'})
  var timeout;
  $successButton.attr('disabled', 'disabled')
  promise.done(function() {
    alert('worked!')
    clearTimeout(timeout)
    $successButton.removeAttr('disabled')
  })
  promise.fail(function() {
    alert('failed, but should have resolved!')
    clearTimeout(timeout)
    $successButton.removeAttr('disabled')
  })
  timeout = setTimeout(function() {
    alert('Timeout!')
    $successButton.removeAttr('disabled')
  }, 5000)
})
$failButton.on('click', function() {
  var promise = hoodie.task.start('test', {name: 'error', message: 'I should fail'})
  var timeout;
  $failButton.attr('disabled', 'disabled')
  promise.fail(function() {
    alert('worked!')
    clearTimeout(timeout)
    $failButton.removeAttr('disabled')
  })
  promise.done(function() {
    alert('resolved, but should have failed!')
    clearTimeout(timeout)
    $failButton.removeAttr('disabled')
  })
  timeout = setTimeout(function() {
    alert('Timeout!')
    $failButton.removeAttr('disabled')
  }, 5000)
})
