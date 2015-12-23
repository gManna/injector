interface IComponent<T> {
  id: string;
  definition: any;
}

class Component implements IComponent {
  id: string;
  definition: any;

  constructor(id:string, definition:any) {
    this.id = id;
    this.definition = definition;
  }

}

