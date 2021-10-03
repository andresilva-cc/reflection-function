import ReflectionClass from '../ReflectionClass';

describe('ReflectionClass', () => {
  class Person {
    private name: string;

    private age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    public setAge(age: number) {
      this.age = age;
    }

    public getIntroduction(): string {
      return `Hi, I'm ${this.name} and I'm ${this.age} years old`;
    }
  }

  const invalidObject = {} as Function;

  let reflectedPerson: ReflectionClass;

  beforeAll(() => {
    reflectedPerson = new ReflectionClass(Person);
  });

  it('should contain the correct class name', () => {
    expect(reflectedPerson.name).toBe('Person');
  });

  test('constructor should contain 2 parameters', () => {
    expect(reflectedPerson.classConstructor.numberOfParameters).toBe(2);
  });

  test('constructor should contain the correct parameters name', () => {
    expect(reflectedPerson.classConstructor.parameters[0].name).toBe('name');
    expect(reflectedPerson.classConstructor.parameters[1].name).toBe('age');
  });

  it('should contain setAge method with a parameter named age', () => {
    expect(reflectedPerson.methods[0].name).toBe('setAge');
    expect(reflectedPerson.methods[0].numberOfParameters).toBe(1);
    expect(reflectedPerson.methods[0].parameters[0].name).toBe('age');
  });

  it('should contain getIntroduction method without any parameters', () => {
    expect(reflectedPerson.methods[1].name).toBe('getIntroduction');
    expect(reflectedPerson.methods[1].numberOfParameters).toBe(0);
  });

  it('should throw an error when an invalid object is passed', () => {
    expect(() => new ReflectionClass(invalidObject)).toThrow();
  });
});
