import ReflectionParameter from './ReflectionParameter';
import Parser from './Parser';

class ReflectionFunction {
  public readonly name: string;

  public readonly parameters: Array<ReflectionParameter>;

  constructor(functionObject: Function | string, name?: string) {
    const parsedFunction = Parser.parse(functionObject);

    this.name = name || parsedFunction.name;
    this.parameters = parsedFunction.parameters;
  }

  get numberOfParameters() {
    return this.parameters.length;
  }
}

export default ReflectionFunction;
