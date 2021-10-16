import ReflectionFunction from '../ReflectionFunction';

describe('ReflectionFunction', () => {
  function add(a: number, b: number): number {
    return a + b;
  }

  function getPI() {
    return 3.14;
  }

  const multiply = `
    multiply(a, b) {
      return a * b;
    }
  `;

  const invalidObject = {} as Function;

  let reflectedAdd: ReflectionFunction;
  let reflectedGetPI: ReflectionFunction;
  let reflectedMultiply: ReflectionFunction;

  beforeAll(() => {
    reflectedAdd = new ReflectionFunction(add);
    reflectedGetPI = new ReflectionFunction(getPI);
    reflectedMultiply = new ReflectionFunction(multiply);
  });

  test('normal function: should contain the correct function name', () => {
    expect(reflectedAdd.name).toBe('add');
  });

  test('normal function: should contain 2 parameters', () => {
    expect(reflectedAdd.numberOfParameters).toBe(2);
  });

  test('normal function: should contain the correct parameters name', () => {
    expect(reflectedAdd.parameters[0].name).toBe('a');
    expect(reflectedAdd.parameters[1].name).toBe('b');
  });

  test('normal function: parameters array should be empty', () => {
    expect(reflectedGetPI.parameters.length).toBe(0);
  });

  test('without function keyword: should contain the correct function name', () => {
    expect(reflectedMultiply.name).toBe('multiply');
  });

  test('without function keyword: should contain 2 parameters', () => {
    expect(reflectedMultiply.numberOfParameters).toBe(2);
  });

  test('without function keyword: should contain the correct parameters name', () => {
    expect(reflectedMultiply.parameters[0].name).toBe('a');
    expect(reflectedMultiply.parameters[1].name).toBe('b');
  });

  test('arrow function: name should be empty', () => {
    const reflectedArrowFunction = new ReflectionFunction((a: string, b: string) => a + b);
    expect(reflectedArrowFunction.name).toBeFalsy();
  });

  it('should throw an error when an invalid object is passed', () => {
    expect(() => new ReflectionFunction(invalidObject)).toThrow();
  });
});
