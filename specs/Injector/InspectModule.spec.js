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

  it("should be rejected if first param is not a string or a Module Object", function(done) {
      $M
        .inspectModule()
        .fail(function() {
          expect(this.state()).toBe('rejected');
        })
        .always(function() {
          done();
        })
      ;
  });

  it("should work with a Module Object as a param", function(done) {
    $M.setModule('test', function() {});

    $M
      .getModule('test')
      .then(function(testModule) {
        return $M.inspectModule(testModule);
      })
      .then(function(scope) {
      })
      .always(function() {
        done();
      })
    ;

  });

  it("should work with a Module Object as a param", function(done) {
    $M.setModule('test1', function() {
      this.greetings = 'Hello World';
    });

    $M
      .getModule('test1')
      .then(function(testModule) {
        return $M.runModule(testModule);
      })
      .then(function(testModule) {
        return $M.inspectModule(testModule);
      })
      .then(function(scope) {
        expect(scope.greetings).toEqual('Hello World');
      })
      .always(function() {
        done();
      })
    ;

  });

});
