/*!
 * @project $M - Predators Module Management System
 * @requires jQuery (window.jQuery)
 * @version 0.0.1
 * @date Wed Dec 23 2015 17:44:52 GMT+0100 (W. Europe Standard Time)
 **/
!function(window, jQuery) {
  "use strict";
  function isString(input) {
    return "string" === jQuery.type(input)
  }

  function isFunction(input) {
    return jQuery.isFunction(input)
  }

  var reject = function(reason) {
    return jQuery.Deferred().reject(reason)
  }, resolve = jQuery.when, Component = function() {
    function Component(id, definition) {
      this.id = id, this.definition = definition
    }

    return Component
  }(), Module = function() {
    function Module(id, factory) {
      this.id = id, this.factory = factory, this.scope = {}
    }

    return Module.prototype.toString = function() {
      return this.id
    }, Module.isModule = function(value) {
      return value instanceof Module
    }, Module
  }(), $M = function() {
    function $M() {
      this._YTOS_READY_EVENT_ = "yTosReady", this._INJECTOR_MODULES_CONTAINER_ = {}, this._INJECTOR_COMPONENTS_CONTAINER_ = {}
    }

    return $M.prototype.getModule = function(id) {
      var _this = this;
      return isString(id) ? this.hasModule(id).then(function() {
        return _this._INJECTOR_MODULES_CONTAINER_[id]
      }).fail(function() {
        return reject("$M unknown module " + id)
      }) : reject("$M.getModule, first param must be a string")
    }, $M.prototype.inspectModule = function(module) {
      var promise = reject("$M.inspectModule unknown " + module + ", param must be a string or a Module");
      return isString(module) && (promise = this.getModule(module.toString())), Module.isModule(module) && (promise = resolve(module)), promise.then(function(module) {
        return module.scope
      })
    }, $M.prototype.setModule = function(id, factory) {
      if(!isString(id))throw Error("$M.setModule, first param must be a string");
      if(!isFunction(id))throw Error("$M.setModule, second param must be a function");
      if(this.hasModuleSync(id))throw Error("$M.setModule " + id + " alredy exists");
      return this._INJECTOR_MODULES_CONTAINER_[id] = new Module(id, factory), this
    }, $M.prototype.hasModuleSync = function(id) {
      return this._INJECTOR_MODULES_CONTAINER_.hasOwnProperty(id)
    }, $M.prototype.hasModule = function(id) {
      return this.hasModuleSync(id) ? resolve() : reject()
    }, $M.prototype.runModules = function(modules) {
      for(var promises = [], i = 0; i < modules.length; i++) {
        var module = modules[i];
        promises.push(this.runModule(module))
      }
      return resolve.apply(jQuery, modules)
    }, $M.prototype.runModule = function(module) {
      var promise = reject("$M.runModule unknown " + module + ", param must be a string or a Module");
      return isString(module) && (promise = this.getModule(module.toString())), Module.isModule(module) && (promise = resolve(module)), promise.then(function(module) {
        var failure, deferred = jQuery.Deferred();
        try {
          module.factory.call(module.scope, jQuery)
        } catch(error) {
          failure = error
        }
        return window.setTimeout(function() {
          failure ? deferred.reject(failure) : deferred.resolve(module)
        }, 0), deferred.promise()
      })
    }, $M.prototype.setComponent = function(id, definition) {
      if(!isString(id))throw Error("$M.setComponent, first param must be a string");
      if(this.hasComponent(id))throw Error("$M.setComponent " + id + " alredy exists");
      return this._INJECTOR_COMPONENTS_CONTAINER_[id] = new Component(id, definition), this
    }, $M.prototype.getComponent = function(id) {
      if(!isString(id))throw Error("$M.getComponent, first param must be a string");
      if(!this.hasComponent(id))throw Error("$M.Component " + id + " not found");
      return this._INJECTOR_COMPONENTS_CONTAINER_[id].definition
    }, $M.prototype.hasComponent = function(id) {
      return this._INJECTOR_COMPONENTS_CONTAINER_.hasOwnProperty(id)
    }, $M.prototype.yTosReady = function(module) {
      var _this = this, deferred = jQuery.Deferred();
      return jQuery(document).on(this._YTOS_READY_EVENT_, function() {
        deferred.resolve(_this.runModule(module))
      }), deferred.promise()
    }, $M
  }();
  window.$M = new $M
}(window, window.jQuery);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWRhdG9ycy1lczYtaW5qZWN0b3IuanMiXSwibmFtZXMiOlsid2luZG93IiwialF1ZXJ5IiwiaXNTdHJpbmciLCJpbnB1dCIsInR5cGUiLCJpc0Z1bmN0aW9uIiwicmVqZWN0IiwicmVhc29uIiwiRGVmZXJyZWQiLCJyZXNvbHZlIiwid2hlbiIsIkNvbXBvbmVudCIsImlkIiwiZGVmaW5pdGlvbiIsInRoaXMiLCJNb2R1bGUiLCJmYWN0b3J5Iiwic2NvcGUiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImlzTW9kdWxlIiwidmFsdWUiLCIkTSIsIl9ZVE9TX1JFQURZX0VWRU5UXyIsIl9JTkpFQ1RPUl9NT0RVTEVTX0NPTlRBSU5FUl8iLCJfSU5KRUNUT1JfQ09NUE9ORU5UU19DT05UQUlORVJfIiwiZ2V0TW9kdWxlIiwiX3RoaXMiLCJoYXNNb2R1bGUiLCJ0aGVuIiwiZmFpbCIsImluc3BlY3RNb2R1bGUiLCJtb2R1bGUiLCJwcm9taXNlIiwic2V0TW9kdWxlIiwiRXJyb3IiLCJoYXNNb2R1bGVTeW5jIiwiaGFzT3duUHJvcGVydHkiLCJydW5Nb2R1bGVzIiwibW9kdWxlcyIsInByb21pc2VzIiwiaSIsImxlbmd0aCIsInB1c2giLCJydW5Nb2R1bGUiLCJhcHBseSIsImZhaWx1cmUiLCJkZWZlcnJlZCIsImNhbGwiLCJlcnJvciIsInNldFRpbWVvdXQiLCJzZXRDb21wb25lbnQiLCJoYXNDb21wb25lbnQiLCJnZXRDb21wb25lbnQiLCJ5VG9zUmVhZHkiLCJkb2N1bWVudCIsIm9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Q0FLRyxTQUFVQSxPQUFRQyxRQUNyQixZQUNDLFNBQVNDLFVBQVNDLE9BQ2YsTUFBOEIsV0FBdkJGLE9BQU9HLEtBQUtELE9BRXZCLFFBQVNFLFlBQVdGLE9BQ2hCLE1BQU9GLFFBQU9JLFdBQVdGLE9BRTdCLEdBQUlHLFFBQVMsU0FBVUMsUUFDbkIsTUFBT04sUUFBT08sV0FBV0YsT0FBT0MsU0FFaENFLFFBQVVSLE9BQU9TLEtBQ2pC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QyxHQUFJQyxZQUN0REMsTUFFWFEsR0FBR0osVUFBVW1DLGFBQWUsU0FBVXpDLElBQ2xDLElBQUtWLFNBQVNVLElBQ1YsS0FBTXVCLE9BQU0sZ0RBRWhCLEtBQUtyQixLQUFLc0MsYUFBYXhDLElBQ25CLEtBQU11QixPQUFNLGdCQUFrQnZCLEdBQUssYUFFdkMsT0FBT0UsTUFBS1csZ0NBQWdDYixJQUFJQyxZQUVwRFMsR0FBR0osVUFBVWtDLGFBQWUsU0FBVXhDLElBQ2xDLE1BQU9FLE1BQUtXLGdDQUFnQ1ksZUFBZXpCLEtBRS9EVSxHQUFHSixVQUFVb0MsVUFBWSxTQUFVdEIsUUFDL0IsR0FBSUwsT0FBUWIsS0FDUmlDLFNBQVc5QyxPQUFPTyxVQUl0QixPQUhBUCxRQUFPc0QsVUFBVUMsR0FBRzFDLEtBQUtTLG1CQUFvQixXQUN6Q3dCLFNBQVN0QyxRQUFRa0IsTUFBTWlCLFVBQVVaLFdBRTlCZSxTQUFTZCxXQUViWCxLQUVYdEIsUUFBT3NCLEdBQUssR0FBSUEsS0FFYnRCLE9BQVFBLE9BQU9DIiwiZmlsZSI6InByZWRhdG9ycy1lczYtaW5qZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBpc1N0cmluZyhpbnB1dCkge1xyXG4gICAgcmV0dXJuIGpRdWVyeS50eXBlKGlucHV0KSA9PT0gJ3N0cmluZyc7XHJcbn1cclxuZnVuY3Rpb24gaXNGdW5jdGlvbihpbnB1dCkge1xyXG4gICAgcmV0dXJuIGpRdWVyeS5pc0Z1bmN0aW9uKGlucHV0KTtcclxufVxyXG52YXIgcmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgcmV0dXJuIGpRdWVyeS5EZWZlcnJlZCgpLnJlamVjdChyZWFzb24pO1xyXG59O1xyXG52YXIgcmVzb2x2ZSA9IGpRdWVyeS53aGVuO1xyXG52YXIgQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENvbXBvbmVudChpZCwgZGVmaW5pdGlvbikge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmRlZmluaXRpb24gPSBkZWZpbml0aW9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIENvbXBvbmVudDtcclxufSkoKTtcclxudmFyIE1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBNb2R1bGUoaWQsIGZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5mYWN0b3J5ID0gZmFjdG9yeTtcclxuICAgICAgICB0aGlzLnNjb3BlID0ge307XHJcbiAgICB9XHJcbiAgICBNb2R1bGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfTtcclxuICAgIE1vZHVsZS5pc01vZHVsZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIE1vZHVsZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTW9kdWxlO1xyXG59KSgpO1xyXG52YXIgJE0gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gJE0oKSB7XHJcbiAgICAgICAgdGhpcy5fWVRPU19SRUFEWV9FVkVOVF8gPSAneVRvc1JlYWR5JztcclxuICAgICAgICB0aGlzLl9JTkpFQ1RPUl9NT0RVTEVTX0NPTlRBSU5FUl8gPSB7fTtcclxuICAgICAgICB0aGlzLl9JTkpFQ1RPUl9DT01QT05FTlRTX0NPTlRBSU5FUl8gPSB7fTtcclxuICAgIH1cclxuICAgICRNLnByb3RvdHlwZS5nZXRNb2R1bGUgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghaXNTdHJpbmcoaWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoXCIkTS5nZXRNb2R1bGUsIGZpcnN0IHBhcmFtIG11c3QgYmUgYSBzdHJpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgICAgICAgIC5oYXNNb2R1bGUoaWQpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9JTkpFQ1RPUl9NT0RVTEVTX0NPTlRBSU5FUl9baWRdOyB9KVxyXG4gICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7IHJldHVybiByZWplY3QoXCIkTSB1bmtub3duIG1vZHVsZSBcIiArIGlkKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgJE0ucHJvdG90eXBlLmluc3BlY3RNb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSByZWplY3QoXCIkTS5pbnNwZWN0TW9kdWxlIHVua25vd24gXCIgKyBtb2R1bGUgKyBcIiwgcGFyYW0gbXVzdCBiZSBhIHN0cmluZyBvciBhIE1vZHVsZVwiKTtcclxuICAgICAgICBpZiAoaXNTdHJpbmcobW9kdWxlKSkge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy5nZXRNb2R1bGUobW9kdWxlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTW9kdWxlLmlzTW9kdWxlKG1vZHVsZSkpIHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHJlc29sdmUobW9kdWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2VcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1vZHVsZSkgeyByZXR1cm4gbW9kdWxlLnNjb3BlOyB9KTtcclxuICAgIH07XHJcbiAgICAkTS5wcm90b3R5cGUuc2V0TW9kdWxlID0gZnVuY3Rpb24gKGlkLCBmYWN0b3J5KSB7XHJcbiAgICAgICAgaWYgKCFpc1N0cmluZyhpZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCIkTS5zZXRNb2R1bGUsIGZpcnN0IHBhcmFtIG11c3QgYmUgYSBzdHJpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNGdW5jdGlvbihpZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCIkTS5zZXRNb2R1bGUsIHNlY29uZCBwYXJhbSBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmhhc01vZHVsZVN5bmMoaWQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiJE0uc2V0TW9kdWxlIFwiICsgaWQgKyBcIiBhbHJlZHkgZXhpc3RzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9JTkpFQ1RPUl9NT0RVTEVTX0NPTlRBSU5FUl9baWRdID0gbmV3IE1vZHVsZShpZCwgZmFjdG9yeSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgJE0ucHJvdG90eXBlLmhhc01vZHVsZVN5bmMgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSU5KRUNUT1JfTU9EVUxFU19DT05UQUlORVJfLmhhc093blByb3BlcnR5KGlkKTtcclxuICAgIH07XHJcbiAgICAkTS5wcm90b3R5cGUuaGFzTW9kdWxlID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzTW9kdWxlU3luYyhpZCkgPyByZXNvbHZlKCkgOiByZWplY3QoKTtcclxuICAgIH07XHJcbiAgICAkTS5wcm90b3R5cGUucnVuTW9kdWxlcyA9IGZ1bmN0aW9uIChtb2R1bGVzKSB7XHJcbiAgICAgICAgdmFyIHByb21pc2VzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2R1bGUgPSBtb2R1bGVzW2ldO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMucnVuTW9kdWxlKG1vZHVsZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzb2x2ZS5hcHBseShqUXVlcnksIG1vZHVsZXMpO1xyXG4gICAgfTtcclxuICAgICRNLnByb3RvdHlwZS5ydW5Nb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSByZWplY3QoXCIkTS5ydW5Nb2R1bGUgdW5rbm93biBcIiArIG1vZHVsZSArIFwiLCBwYXJhbSBtdXN0IGJlIGEgc3RyaW5nIG9yIGEgTW9kdWxlXCIpO1xyXG4gICAgICAgIGlmIChpc1N0cmluZyhtb2R1bGUpKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLmdldE1vZHVsZShtb2R1bGUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNb2R1bGUuaXNNb2R1bGUobW9kdWxlKSkge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gcmVzb2x2ZShtb2R1bGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAgICAgICAgIHZhciBmYWlsdXJlLCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbW9kdWxlLmZhY3RvcnkuY2FsbChtb2R1bGUuc2NvcGUsIGpRdWVyeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBmYWlsdXJlID0gZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZhaWx1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKG1vZHVsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgICRNLnByb3RvdHlwZS5zZXRDb21wb25lbnQgPSBmdW5jdGlvbiAoaWQsIGRlZmluaXRpb24pIHtcclxuICAgICAgICBpZiAoIWlzU3RyaW5nKGlkKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIiRNLnNldENvbXBvbmVudCwgZmlyc3QgcGFyYW0gbXVzdCBiZSBhIHN0cmluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQ29tcG9uZW50KGlkKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIiRNLnNldENvbXBvbmVudCBcIiArIGlkICsgXCIgYWxyZWR5IGV4aXN0c1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fSU5KRUNUT1JfQ09NUE9ORU5UU19DT05UQUlORVJfW2lkXSA9IG5ldyBDb21wb25lbnQoaWQsIGRlZmluaXRpb24pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgICRNLnByb3RvdHlwZS5nZXRDb21wb25lbnQgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBpZiAoIWlzU3RyaW5nKGlkKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIiRNLmdldENvbXBvbmVudCwgZmlyc3QgcGFyYW0gbXVzdCBiZSBhIHN0cmluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc0NvbXBvbmVudChpZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCIkTS5Db21wb25lbnQgXCIgKyBpZCArIFwiIG5vdCBmb3VuZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0lOSkVDVE9SX0NPTVBPTkVOVFNfQ09OVEFJTkVSX1tpZF0uZGVmaW5pdGlvbjtcclxuICAgIH07XHJcbiAgICAkTS5wcm90b3R5cGUuaGFzQ29tcG9uZW50ID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0lOSkVDVE9SX0NPTVBPTkVOVFNfQ09OVEFJTkVSXy5oYXNPd25Qcm9wZXJ0eShpZCk7XHJcbiAgICB9O1xyXG4gICAgJE0ucHJvdG90eXBlLnlUb3NSZWFkeSA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGpRdWVyeShkb2N1bWVudCkub24odGhpcy5fWVRPU19SRUFEWV9FVkVOVF8sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfdGhpcy5ydW5Nb2R1bGUobW9kdWxlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gJE07XHJcbn0pKCk7XHJcbndpbmRvdy4kTSA9IG5ldyAkTSgpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVkYXRvcnMtZXM2LWluamVjdG9yLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
