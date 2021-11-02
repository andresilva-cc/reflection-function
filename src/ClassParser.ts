import Parser from './Parser';
import ReflectionFunction from './ReflectionFunction';

class ClassParser extends Parser {
  public static override parse(classObject: Function | string): any {
    if (this.isFunctionSyntax(classObject)) {
      return this.parseAsFunctionSyntax(classObject as Function);
    }

    if (this.isClassSyntax(classObject)) {
      return this.parseAsClassSyntax(classObject);
    }

    throw new Error('Unknown syntax.');
  }

  private static isFunctionSyntax(classObject: Function | string): any {
    return classObject.toString().trim().startsWith('function');
  }

  private static isClassSyntax(classObject: Function | string): any {
    return classObject.toString().trim().startsWith('class');
  }

  private static parseAsFunctionSyntax(classObject: Function): any {
    const signature = this.parseSignature(classObject.toString()) as string;

    return {
      name: this.parseName(signature),
      classConstructor: new ReflectionFunction(classObject),
      methods: this.parseMethodsFromPrototype(classObject.prototype),
    };
  }

  private static parseAsClassSyntax(classObject: Function | string): any {
    const classAsString = classObject.toString();
    const signature = this.parseSignature(classAsString) as string;

    return {
      name: this.parseClassName(signature),
      classConstructor: this.parseConstructor(classAsString),
      methods: this.parseMethodsFromString(classAsString),
    };
  }

  private static parseClassName(rawSignature: string) {
    return rawSignature.match(/\bclass\b\s(.+)\{/)?.[1].split(' ')[0].trim();
  }

  private static parseConstructor(classAsString: string) {
    const matches = classAsString.match(/(.+\(.*\))(\s{)/g);

    if (!matches) {
      return undefined;
    }

    const classConstructor = matches.find((match) => match.trim().startsWith('constructor'));

    if (!classConstructor) {
      return undefined;
    }

    return new ReflectionFunction(classConstructor.trim());
  }

  private static parseMethodsFromString(classAsString: string): Array<ReflectionFunction> {
    const matches = classAsString.match(/(.+\(.*\))(\s{)/g);

    if (!matches) {
      return [];
    }

    const matchesWithoutConstructor = matches.filter((match) => !match.trim().startsWith('constructor'));

    if (!matchesWithoutConstructor) {
      return [];
    }

    return matchesWithoutConstructor.map((match) => new ReflectionFunction(match));
  }

  private static parseMethodsFromPrototype(methods: object) {
    const parsedMethods: Array<ReflectionFunction> = [];

    Object.entries(methods).forEach(([key, value]) => {
      parsedMethods.push(new ReflectionFunction(value, key));
    });

    return parsedMethods;
  }
}

export default ClassParser;
