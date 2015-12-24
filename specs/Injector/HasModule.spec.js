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
    var promise = $M.hasModule('baz');

    promise
      .always(function() {
        expect(promise.state()).toEqual('rejected');

        done();
      })
    ;
  });

  it("should call hasModuleSync", function(done) {
    spyOn($M, 'hasModuleSync').and.callThrough();

    $M
      .hasModule('baz')
      .always(function() {
        expect($M.hasModuleSync).toHaveBeenCalled();

        done();
      })
    ;
  });

  it("should not reject if module exists", function(done) {
    $M.setModule('baz', function() {});

    var promise = $M.hasModule('baz');

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
      .getModule('hasOwnProperty')
      .always(function() {
        expect(this.state()).toEqual('rejected');
        done();
      });
  });
});