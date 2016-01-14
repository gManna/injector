fdescribe('$M.set', function() {
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
      $M.set();
    }).toThrowError("$M.set, first param must be a string");

  });

  it("should throw if first param is string and second is not a function", function() {
    expect(function() {
      $M.set('TypeIsString', 'TypeIsNotFunction')
    }).toThrowError("$M.set, second param must be a function");
  });

  it("should return true if module is correctly registered", function() {
    $M.set('foo', function () {});

    expect($M.hasSync('foo')).toBeTruthy();

  });

  it('cannot register a module already registered', function() {
    var moduleName = 'Test';

    expect($M.hasSync(moduleName)).toBeFalsy();
    $M.set(moduleName, function () {});
    expect($M.hasSync(moduleName)).not.toBeFalsy();

    expect(function() {
      $M.set(moduleName, function () {});
    }).toThrowError('$M.set '+ moduleName +' alredy exists');
  });

});
