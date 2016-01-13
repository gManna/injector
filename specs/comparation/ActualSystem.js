(function($M) {
  $M.setComponent('CIAO', {
    sayHelloEnglish() {
      alert('HI');
    }
  })
})(window.$M);

(function($M) {

  $M.setModule('ChangeBackgroundDelayedCtrl', function ChangeBackgroundDelayedCtrl($) {
    this.var = '';


    this.DELAY = 3000;

    window.setTimeout(() => {
      this.changed.sayHelloEnglish();

    }, this.DELAY);
  })
})(window, window.$M);


(function(window, $M) {
  $(document).ready(function() {
    $M.runModule('ChangeBackgroundDelayedCtrl');
    $M.runModule('a');
    $M.runModule('b');
    $M.runModule('c');
    $M.runModule('d');

    $M.runModules(['a', 'b', 'c']);
  });
})(window, window.$M);