interface Injector {
  set(moduleId:string, factory:Function): Injector;
  get(moduleId:string): JQueryDeferred<Module|JQueryPromiseCallback<any>>;
  hasSync(moduleId:string): boolean;
  has(moduleId:string): JQueryDeferred<Module|JQueryPromiseCallback<any>>;

  inspect(module:string | Module): JQueryDeferred<ModuleScope|JQueryPromiseCallback<any>>;

  yTosReady(module:Module): JQueryDeferred<Module|JQueryPromiseCallback<any>>;
  runModule(module:string | Module): JQueryDeferred<Module|JQueryPromiseCallback<any>>;
  runModules(module:string[] | Module[]): JQueryDeferred<Module[]|Error[]>;

}

class $M implements Injector {
  _YTOS_READY_EVENT_:string = 'yTosReady';

  _INJECTOR_MODULES_CONTAINER_:Object = {};
  _INJECTOR_COMPONENTS_CONTAINER_:Object = {};

  get(id:string) {
    var deferred = jQuery.Deferred();

    window.setTimeout(() => {
      if(!isString(id)) {
         return deferred.reject("$M.get, first param must be a string");
      }

      if(this.hasSync(id)) {
        return deferred.resolve(this._INJECTOR_MODULES_CONTAINER_[id])
      }

      return deferred.reject(`$M unknown module ${id}`)
    });

    return deferred.promise();
  }

  inspect(module:string | Module) {
    var promise = reject(`$M.inspect unknown ${module}, param must be a string or a Module`);

    if(isString(module)) {
      promise = this.get((module || '').toString());
    }

    if(Module.isModule(module)) {
      promise = resolve(module)
    }

    return promise
      .then(module => module.scope)
    ;
  }

  set(id:string, factory:Function) {
    if(!isString(id)) {
      throw Error("$M.set, first param must be a string");
    }

    if(!isFunction(factory)) {
      throw Error("$M.set, second param must be a function");
    }

    if(this.hasSync(id)) {
      throw Error(`$M.set ${id} alredy exists`);
    }

    this._INJECTOR_MODULES_CONTAINER_[id] = new Module(id, factory);

    return this;
  }

  hasSync(id:string) {
    return this._INJECTOR_MODULES_CONTAINER_.hasOwnProperty(id);
  }

  has(id:string) {
    return this.hasSync(id) ? resolve() : reject();
  }

  runModules(modules:string[] | Module[]) {
    var promises:Array<string|Module> = [];

    for(var i = 0; i < modules.length; i++) {
      var module = modules[i];

      promises.push(this.runModule(module));
    }

    return resolve.apply(jQuery, promises);
  }

  runModule(module:string | Module) {
    var promise = reject(`$M.runModule unknown ${module}, param must be a string or a Module`);

    if(isString(module)) {
      promise = this.get((module || '').toString());
    }

    if(Module.isModule(module)) {
      promise = resolve(module)
    }

    return promise
      .then((module:Module) => {
        var failure:Error, deferred:JQueryDeferred = jQuery.Deferred();

        try {
          module.factory.call(module.scope, jQuery);
        } catch(error) {
          failure = error;
        }

        window.setTimeout(function() {
          if(failure) {
            deferred.reject(failure);
          } else {
            deferred.resolve(module);
          }
        }, 0);

        return deferred.promise();
      })
  }


  yTosReady(module:any) {
    let deferred:JQueryDeferred = jQuery.Deferred();

    jQuery(document).on(this._YTOS_READY_EVENT_, () => {
      deferred.resolve(module && this.runModule(module));
    });

    return deferred.promise();
  }
}
