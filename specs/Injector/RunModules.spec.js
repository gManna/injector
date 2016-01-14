describe('$M.set', function() {
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
        .inspect()
        .fail(function() {
          expect(this.state()).toBe('rejected');
        })
        .always(function() {
          done();
        })
      ;
  });



});
