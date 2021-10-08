import ReflectionParameter from './ReflectionParameter';

class Parser {
  public static parse(functionObject: Function | string): any {
    const functionAsString = functionObject.toString();

    const signature = this.parseSignature(functionAsString);

    if (!signature) {
      throw new Error('ReflectionFunction: Invalid object received.');
    }

    return {
      name: this.parseName(functionObject),
      parameters: this.parseParameters(signature),
    };
  }

  protected static parseSignature(functionAsString: string) {
    return functionAsString.match(/(.*)(\s[{=>]+)/)?.[0]?.trim();
  }

  protected static parseName(functionObject: Function | string) {
    if (typeof functionObject === 'function') {
      return functionObject.name;
    }

    return functionObject.match(/(function\s)?(.+)\(/)?.[2]?.trim();
  }

  protected static parseParameters(signature: string) {
    const match = signature.match(/\((.*)\)/)?.[1]?.trim();

    if (!match) {
      return [];
    }

    const parameters = match.split(',');

    const parsedParameters: Array<ReflectionParameter> = [];

    for (let index = 0; index < parameters.length; index += 1) {
      parsedParameters.push(new ReflectionParameter(
        index,
        parameters[index].trim(),
      ));
    }

    return parsedParameters;
  }
}

export default Parser;
