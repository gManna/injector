describe('$M.hasModule', function() {
  var $M;

  beforeEach(function(done) {
    $M = window.$M;
    done();
  });

  afterEach(function(done) {
    $M = void 0;
    done();
  });

  it("should reject if module does not exist", function(done) {
    var promise = $M.has('baz');

    promise
      .always(function() {
        expect(promise.state()).toEqual('rejected');

        done();
      })
    ;
  });

  it("should call hasSync", function(done) {
    spyOn($M, 'hasSync').and.callThrough();

    $M
      .has('baz')
      .always(function() {
        expect($M.hasSync).toHaveBeenCalled();

        done();
      })
    ;
  });

  it("should not reject if module exists", function(done) {
    $M.set('baz', function() {});

    var promise = $M.has('baz');

    promise
      .always(function() {
        expect(promise.state()).not.toEqual('rejected');
        expect(promise.state()).toEqual('resolved');
        done();
      })
    ;
  });

  it("should not consider prototype inheritance", function(done) {
    expect($M.hasOwnProperty).toBeDefined();

    $M
      .get('hasOwnProperty')
      .always(function() {
        expect(this.state()).toEqual('rejected');
        done();
      });
  });
});