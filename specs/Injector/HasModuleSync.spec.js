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
    expect($M.hasModuleSync('foobar')).toBeFalsy();
  });

  it("should doesn not consider prototype inheritance", function() {
    expect($M.hasOwnProperty).toBeTruthy();
    expect($M.hasModuleSync('hasOwnProperty')).toBeFalsy();
  });

  it("should return true if exists", function() {
    $M.setModule('bar', function() {});
    expect($M.hasModuleSync('bar')).toBeTruthy();
  });


});