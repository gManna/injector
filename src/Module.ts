interface IModule {
  id: string;
  factory: Function;
  scope: ModuleScope;
  toString(): string;
}

class Module implements IModule {
  id: string;
  factory: Function;
  scope: ModuleScope;

  constructor(id:string, factory:Function) {
    this.id = id;
    this.factory = factory;
    this.scope = new ModuleScope();
  }

  toString() {
    return this.id;
  }

  static isModule(value: any) {
    return value instanceof Module;
  }
}

