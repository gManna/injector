interface Window {
  $M: $M
}

var $MInjector:$M = new $M();

if (Object.defineProperty) {
  Object.defineProperty(window, '$M', {
    value: $MInjector,
    writable: false,
    enumerable: true,
    configurable: false
  });
} else {
  window.$M = $MInjector;
}
