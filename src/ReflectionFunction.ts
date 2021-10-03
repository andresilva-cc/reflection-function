import ReflectionParameter from './ReflectionParameter';
import Parser from './Parser';

class ReflectionFunction {
  public readonly name: string;

  public readonly parameters: Array<ReflectionParameter>;

  constructor(functionReference: Function, name?: string) {
    const parsedFunction = Parser.parse(functionReference);

    this.name = name || parsedFunction.name;
    this.parameters = parsedFunction.parameters;
  }

  get numberOfParameters() {
    return this.parameters.length;
  }
}

export default ReflectionFunction;
