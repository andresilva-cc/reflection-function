import Parser from './Parser';
import ReflectionFunction from './ReflectionFunction';

class ClassParser extends Parser {
  public static override parse(classObject: Function): any {
    if (this.isFunctionSyntax(classObject)) {
      return this.parseAsFunctionSyntax(classObject);
    }

    if (this.isClassSyntax(classObject)) {
      throw new Error('Not implemented.');
    }

    throw new Error('Unknown syntax.');
  }

  private static isFunctionSyntax(classObject: Function): any {
    return classObject.toString().startsWith('function');
  }

  private static isClassSyntax(classObject: Function): any {
    return classObject.toString().startsWith('class');
  }

  private static parseAsFunctionSyntax(classObject: Function): any {
    const signature = this.parseSignature(classObject.toString()) as string;

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
