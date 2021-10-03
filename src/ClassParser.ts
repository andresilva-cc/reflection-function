import Parser from './Parser';
import ReflectionFunction from './ReflectionFunction';

class ClassParser extends Parser {
  public static override parse(classObject: Function): any {
    const signature = this.parseSignature(classObject.toString());

    if (!signature) {
      throw new Error('ReflectionClass: Invalid object received.');
    }

    return {
      name: this.parseName(signature),
      classConstructor: new ReflectionFunction(classObject),
      methods: this.parseMethods(classObject.prototype),
    };
  }

  private static parseMethods(methods: object) {
    const parsedMethods: Array<ReflectionFunction> = [];

    Object.entries(methods).forEach(([key, value]) => {
      parsedMethods.push(new ReflectionFunction(value, key));
    });

    return parsedMethods;
  }
}

export default ClassParser;
