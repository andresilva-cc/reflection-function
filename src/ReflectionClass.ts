import ClassParser from './ClassParser';
import ReflectionFunction from './ReflectionFunction';

class ReflectionClass {
  public readonly name: string;

  public readonly classConstructor: ReflectionFunction;

  public readonly methods: Array<ReflectionFunction>;

  constructor(classReference: Function | string) {
    const parsedClass = ClassParser.parse(classReference);

    this.name = parsedClass.name;
    this.classConstructor = parsedClass.classConstructor;
    this.methods = parsedClass.methods;
  }
}

export default ReflectionClass;
