describe('$M.getModule', function() {
  var $M;

  beforeEach(function(done) {
    $M = window.$M;
    done();
  });

  afterEach(function(done) {
    $M = void 0;
    done();
  });

  describe("first param must be a string", function() {

    it("should fail if param is a number", function(done) {
      var param = 111;
      $M
        .getModule(param)
        .fail(function(error) {
          expect(error).toEqual("$M.getModule, first param must be a string");
        })
        .always(function() {
          done();
        })
      ;
    });

    it("should fail if param is a object", function(done) {
      var param = {};
      $M
        .getModule(param)
        .fail(function(error) {
          expect(error).toEqual("$M.getModule, first param must be a string");
        })
        .always(function() {
          done();
        })
      ;
    });

    it("should fail if param is an array", function(done) {
      var param = [];
      $M
        .getModule(param)
        .fail(function(error) {
          expect(error).toEqual("$M.getModule, first param must be a string");
        })
        .always(function() {
          done();
        })
      ;
    });

    it("should fail if param is a function", function(done) {
      var param = function() {};
      $M
        .getModule(param)
        .fail(function(error) {
          expect(error).toEqual("$M.getModule, first param must be a string");
        })
        .always(function() {
          done();
        })
      ;
    });

    it("shouldn't fail if param is string", function(done) {
      var param = "foo";

      $M
        .getModule(param)
        .fail(function(error) {
          expect(error).not.toEqual("$M.getModule, first param must be a string");
        })
        .always(function() {
          done();
        })
      ;
    });

  });

  it("should fail if id doesn't exist", function(done) {
    var param = "foo";

    $M
      .getModule(param)
      .fail(function(error) {
        expect(error).toEqual("$M unknown module " + param);
      })
      .always(function() {
        done();
      })
    ;
  });

  it("should call hasModuleSync", function(done) {

    spyOn($M, 'hasModuleSync').and.callThrough();

    $M
      .getModule("foo")
      .always(function() {
        expect($M.hasModuleSync).toHaveBeenCalled();
        done();
      })
    ;
  });

  it("should find the module", function(done) {
    var moduleName = 'Foo';

    $M.setModule(moduleName, function() {
    });

    $M
      .getModule(moduleName)
      .then(function(module) {
        expect(module.id).toEqual(moduleName);
      })
      .always(function() {
        done();
      })
    ;
  });


});