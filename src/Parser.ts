import ReflectionParameter from './ReflectionParameter';

class Parser {
  public static parse(functionObject: Function): any {
    const signature = this.parseSignature(functionObject.toString());

    if (!signature) {
      throw new Error('ReflectionFunction: Invalid object received.');
    }

    return {
      name: this.parseName(signature),
      parameters: this.parseParameters(signature),
    };
  }

  protected static parseSignature(rawFunction: string) {
    return rawFunction.match(/(.+)(\s{)/)?.[0].trim();
  }

  protected static parseName(rawSignature: string) {
    return rawSignature.match(/\bfunction\b\s(.+)\(/)?.[1].trim();
  }

  protected static parseParameters(rawParameters: string) {
    const match = rawParameters.match(/\((.+)\)/)?.[1].trim();

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
