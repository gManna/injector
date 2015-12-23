interface Injector {
  setModule(moduleId:string, factory:Function): Injector;
  getModule(moduleId:string): JQueryDeferred<Module>;
  hasModuleSync(moduleId:string): boolean;
  hasModule(moduleId:string): JQueryDeferred<void>;
  inspectModule(module:string | Module): ModuleScope;
  runModule(module:string | Module): JQueryDeferred<any>;
  runModules(module:string | Module[]): JQueryDeferred<any>;
  yTosReady(module:Module): JQueryDeferred<any>;

  setComponent(id:string, definition:any): Injector;
  getComponent(moduleId:string): Component;
  hasComponent(componentId:string): boolean;
}

class $M implements Injector {
  _YTOS_READY_EVENT_:string = 'yTosReady';

  _INJECTOR_MODULES_CONTAINER_:any[] = [];
  _INJECTOR_COMPONENTS_CONTAINER_:any[] = [];

  constructor() {
  }

  getModule(id:string) {
    if (!isString(id)) {
      return reject("$M.getModule, first param must be a string");
    }

    return this
      .hasModule(id)
      .then(() => this._INJECTOR_MODULES_CONTAINER_[id])
      .fail(() => reject(`$M unknown module ${id}`))
  }

  inspectModule(module:string | Module) {
    var promise = reject(`$M.inspectModule unknown ${module}, param must be a string or a Module`);

    if (isString(module)) {
      promise = this.getModule(module.toString());
    }

    if(Module.isModule(module)) {
      promise = resolve(module)
    }

    return promise
      .then(module => module.scope)
    ;
  }

  setModule(id:string, factory:Function) {
    if (!isString(id)) {
      throw Error("$M.setModule, first param must be a string");
    }

    if (!isFunction(id)) {
      throw Error("$M.setModule, second param must be a function");
    }

    if (this.hasModuleSync(id)) {
      throw Error(`$M.setModule ${id} alredy exists`);
    }

    this._INJECTOR_MODULES_CONTAINER_[id] = new Module(id, factory);

    return this;
  }

  hasModuleSync(id:string) {
    return this._INJECTOR_MODULES_CONTAINER_.hasOwnProperty(id);
  }

  hasModule(id:string) {
    return this.hasModuleSync(id) ? resolve() : reject();
  }

  runModules(modules) {
    var promises = [];

    for (var i = 0; i < modules.length; i++) {
      var module = modules[i];

      promises.push(this.runModule(module));
    }

    return resolve.apply(jQuery, modules);
  }

  runModule(module:string | Module) {
    var promise = reject(`$M.runModule unknown ${module}, param must be a string or a Module`);

    if (isString(module)) {
      promise = this.getModule(module.toString());
    }

    if(Module.isModule(module)) {
      promise = resolve(module)
    }

    return promise
      .then(module => {
        var failure, deferred = jQuery.Deferred();

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

  setComponent(id:string, definition:any) {
    if (!isString(id)) {
      throw Error("$M.setComponent, first param must be a string");
    }

    if (this.hasComponent(id)) {
      throw Error(`$M.setComponent ${id} alredy exists`);
    }

    this._INJECTOR_COMPONENTS_CONTAINER_[id] = new Component(id, definition);

    return this;
  }

  getComponent(id:string) {
    if (!isString(id)) {
      throw Error("$M.getComponent, first param must be a string");
    }

    if (!this.hasComponent(id)) {
      throw Error(`$M.Component ${id} not found`);
    }

    return this._INJECTOR_COMPONENTS_CONTAINER_[id].definition;
  }

  hasComponent(id:string) {
    return this._INJECTOR_COMPONENTS_CONTAINER_.hasOwnProperty(id);
  }

  yTosReady(module:any) {
    let deferred = jQuery.Deferred();

    jQuery(document).on(this._YTOS_READY_EVENT_, () => {
      deferred.resolve(this.runModule(module));
    });

    return deferred.promise();
  }
}

interface Window {
  $M: $M
}
window.$M = new $M();
