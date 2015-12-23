function isString(input:any) {
  return jQuery.type(input) === 'string';
}

function isFunction(input:any) {
  return jQuery.isFunction(input);
}

var reject = function(reason?:any) {
  return jQuery.Deferred().reject(reason);
};

var resolve = function() {
  return jQuery.when.apply(jQuery, arguments);
};

