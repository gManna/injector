describe('$M.setModule', function() {
  var $M;

  beforeEach(function(done) {
    $M = window.$M;
    done();
  });

  afterEach(function(done) {
    $M = void 0;
    done();
  });

  it("should throw if first param is not string", function() {

    expect(function() {
      $M.setModule();
    }).toThrowError("$M.setModule, first param must be a string");

  });

  it("should throw if first param is string and second is not a function", function() {
      var failure;

    expect(function() {
      $M.setModule('TypeIsString', 'TypeIsNotFunction')
    }).toThrowError("$M.setModule, first param must be a string");
  });

});