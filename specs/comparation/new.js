(function() {

  var self = {};

  //variables
  self.variable1 = '';

  //functions
  self.setup = function (){
    $(body).hide()
  };

  self.init = function() {
    try {
      self.setup();
    } catch(e) {
      console.log(e);
      console.log(e.message);
    }
  }



  if(typeof window.$M === 'undefined') {
    window.$M = {};
  }
  window.$M.moduleName = self;

})();