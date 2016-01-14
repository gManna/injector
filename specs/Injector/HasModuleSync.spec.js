describe('$M.hasModuleSync', function() {
  var $M;

  beforeEach(function(done) {
    $M = window.$M;
    done();
  });

  afterEach(function(done) {
    $M = void 0;
    done();
  });


  it("should return false if does not exist", function() {
    expect($M.hasSync('foobar')).toBeFalsy();
  });

  it("should does not consider prototype inheritance", function() {
    expect($M._INJECTOR_MODULES_CONTAINER_.hasOwnProperty).toBeTruthy();
    expect($M.hasSync('hasOwnProperty')).toBeFalsy();
  });

  it("should return true if exists", function() {
    $M.set('bar', function() {});
    expect($M.hasSync('bar')).toBeTruthy();
  });


});