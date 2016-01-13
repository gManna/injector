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
    expect(function() {
      $M.setModule('TypeIsString', 'TypeIsNotFunction')
    }).toThrowError("$M.setModule, second param must be a function");
  });

  it("should return true if module is correctly registered", function() {
    $M.setModule('foo', function () {});

    expect($M.hasModuleSync('foo')).toBeTruthy();

  });

  it('cannot register a module already registered', function() {
    var moduleName = 'Test';

    expect($M.hasModuleSync(moduleName)).toBeFalsy();
    $M.setModule(moduleName, function () {});
    expect($M.hasModuleSync(moduleName)).not.toBeFalsy();

    expect(function() {
      $M.setModule(moduleName, function () {});
    }).toThrowError('$M.setModule '+ moduleName +' alredy exists');
  });

});
