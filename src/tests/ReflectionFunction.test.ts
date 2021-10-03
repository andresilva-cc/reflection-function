import ReflectionFunction from '../ReflectionFunction';

describe('ReflectionFunction', () => {
  function add(a: number, b: number): number {
    return a + b;
  }

  function getPI() {
    return 3.14;
  }

  const invalidObject = {} as Function;

  let reflectedAdd: ReflectionFunction;
  let reflectedGetPI: ReflectionFunction;

  beforeAll(() => {
    reflectedAdd = new ReflectionFunction(add);
    reflectedGetPI = new ReflectionFunction(getPI);
  });

  it('should contain the correct function name', () => {
    expect(reflectedAdd.name).toBe('add');
  });

  it('should contain 2 parameters', () => {
    expect(reflectedAdd.numberOfParameters).toBe(2);
  });

  it('should contain the correct parameters name', () => {
    expect(reflectedAdd.parameters[0].name).toBe('a');
    expect(reflectedAdd.parameters[1].name).toBe('b');
  });

  test('parameters array should be empty', () => {
    expect(reflectedGetPI.parameters.length).toBe(0);
  });

  test('name should be undefined when an arrow function is passed', () => {
    const reflectedArrowFunction = new ReflectionFunction((a: string, b: string) => a + b);
    expect(reflectedArrowFunction.name).toBeUndefined();
  });

  it('should throw an error when an invalid object is passed', () => {
    expect(() => new ReflectionFunction(invalidObject)).toThrow();
  });
});
