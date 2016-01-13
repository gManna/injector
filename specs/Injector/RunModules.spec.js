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

  it("should run ", function(done) {
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



});
