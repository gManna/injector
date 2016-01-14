describe('Export $M in the window scope', function() {

  it('should be exported in the window scope', function() {
    expect(window.$M).toBeDefined();
  });

  describe('Lock Property if Object.defineProperty', function() {

    it('should be non-writable', function() {
      var something = 'Something';
      window.$M = something;
      expect(window.$M).not.toBe(something);
    });

    it('should be non-configurable', function() {
      delete window.$M;
      expect(window.$M).toBeDefined();
    });

    it('should be enumerable', function() {
      expect(window.hasOwnProperty('$M')).toBeTruthy();
    });
  });
});


describe('Interface Definition', function() {
  var $M;

  beforeEach(function(done) {
    $M = window.$M;
    done();
  });

  afterEach(function(done) {
    $M = void 0;
    done();
  });

  it('should has a setModule method', function() {
    expect($M.set).toBeDefined();
    expect(typeof $M.set).toBe("function");
  });

  it('should has a getModule method', function() {
    expect($M.get).toBeDefined();
    expect(typeof $M.get).toBe("function");
  });

  it('should has a hasModule method', function() {
    expect($M.has).toBeDefined();
    expect(typeof $M.has).toBe("function");
  });

  it('should has a hasModuleSync method', function() {
    expect($M.hasSync).toBeDefined();
    expect(typeof $M.hasSync).toBe("function");
  });

  it('should has a inspectModule method', function() {
    expect($M.inspect).toBeDefined();
    expect(typeof $M.inspect).toBe("function");
  });

  it('should has a yTosReady method', function() {
    expect($M.yTosReady).toBeDefined();
    expect(typeof $M.yTosReady).toBe("function");
  });

  it('should has a runModule method', function() {
    expect($M.runModule).toBeDefined();
    expect(typeof $M.runModule).toBe("function");
  });

  it('should has a runModules method', function() {
    expect($M.runModules).toBeDefined();
    expect(typeof $M.runModules).toBe("function");
  });

});
