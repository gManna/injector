interface ModuleScope<T> {}

interface IModule<T> {
  id: string;
  factory: Function;
  scope: ModuleScope;
  toString(): string;
}

class Module implements IModule, ModuleScope {
  id: string;
  factory: Function;
  scope: Object;

  constructor(id:string, factory:Function) {
    this.id = id;
    this.factory = factory;
    this.scope = {};
  }

  toString() {
    return this.id;
  }

  static isModule(value: any) {
    return value instanceof Module;
  }
}

