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
    expect($M.setModule).toBeDefined();
    expect(typeof $M.setModule).toBe("function");
  });

  it('should has a getModule method', function() {
    expect($M.getModule).toBeDefined();
    expect(typeof $M.getModule).toBe("function");
  });

  it('should has a hasModule method', function() {
    expect($M.hasModule).toBeDefined();
    expect(typeof $M.hasModule).toBe("function");
  });

  it('should has a hasModuleSync method', function() {
    expect($M.hasModuleSync).toBeDefined();
    expect(typeof $M.hasModuleSync).toBe("function");
  });

  it('should has a inspectModule method', function() {
    expect($M.inspectModule).toBeDefined();
    expect(typeof $M.inspectModule).toBe("function");
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

  it('should has a getComponent method', function() {
    expect($M.getComponent).toBeDefined();
    expect(typeof $M.getComponent).toBe("function");
  });

  it('should has a setComponent method', function() {
    expect($M.setComponent).toBeDefined();
    expect(typeof $M.setComponent).toBe("function");
  });

  it('should has a hasComponent method', function() {
    expect($M.hasComponent).toBeDefined();
    expect(typeof $M.hasComponent).toBe("function");
  });
});
