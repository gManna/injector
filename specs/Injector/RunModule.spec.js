fdescribe('$M.setModule', function() {
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
        .runModule()
        .fail(function() {
          expect(this.state()).toBe('rejected');
        })
        .always(function() {
          done();
        })
      ;
  });

  it("should work with a Module Object as a param", function(done) {
    $M.setModule('test2', function() {});

    $M
      .getModule('test2')
      .then(function(testModule) {
        return $M.runModule(testModule);
      })
      .always(function() {
        done();
      })
    ;

  });

  it("should reject if a Module Object throws an error", function(done) {
    $M.setModule('test3', function() {
      console.log(foo);
    });

    $M
      .runModule('test3')
      .fail(function(error) {
        expect(this.state()).toBe('rejected');
      })
      .always(function() {
        done();
      })
    ;

  });

});
