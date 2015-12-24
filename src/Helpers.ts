function isString(input:any) {
  return jQuery.type(input) === 'string';
}

function isFunction(input:any) {
  return jQuery.isFunction(input);
}

var reject = function(reason?:any) {
  var deferred = jQuery.Deferred();

  setTimeout(() => {
    deferred.reject(reason);
  }, 0);

  return deferred.promise();
};

var resolve = function() {
  return jQuery.when.apply(jQuery, arguments);
};

