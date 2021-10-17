/* eslint-disable func-names */
import ReflectionClass from '../ReflectionClass';

describe('ReflectionClass', () => {
  function Person(this: any, name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  Person.prototype.setAge = function (age: number) {
    this.age = age;
  };

  Person.prototype.getIntroduction = function () {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old`;
  };

  const PersonClassSyntax = `
  class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    setAge(age) {
        this.age = age;
    }
    getIntroduction() {
        return \`Hi, I'm \${this.name} and I'm \${this.age} years old\`;
    }
  }
  `;

  const invalidObject = {} as Function;

  let reflectedPersonFunctionSyntax: ReflectionClass;
  let reflectedPersonClassSyntax: ReflectionClass;

  beforeAll(() => {
    reflectedPersonFunctionSyntax = new ReflectionClass(Person);
    reflectedPersonClassSyntax = new ReflectionClass(PersonClassSyntax);
  });

  it('function syntax: should contain the correct class name', () => {
    expect(reflectedPersonFunctionSyntax.name).toBe('Person');
  });

  it('class syntax: should contain the correct class name', () => {
    expect(reflectedPersonClassSyntax.name).toBe('Person');
  });

  test('function syntax: constructor should contain 2 parameters', () => {
    expect(reflectedPersonFunctionSyntax.classConstructor.numberOfParameters).toBe(2);
  });

  test('class syntax: constructor should contain 2 parameters', () => {
    expect(reflectedPersonClassSyntax.classConstructor.numberOfParameters).toBe(2);
  });

  test('function syntax: constructor should contain the correct parameters name', () => {
    expect(reflectedPersonFunctionSyntax.classConstructor.parameters[0].name).toBe('name');
    expect(reflectedPersonFunctionSyntax.classConstructor.parameters[1].name).toBe('age');
  });

  test('class syntax: constructor should contain the correct parameters name', () => {
    expect(reflectedPersonClassSyntax.classConstructor.parameters[0].name).toBe('name');
    expect(reflectedPersonClassSyntax.classConstructor.parameters[1].name).toBe('age');
  });

  it('function syntax: should contain setAge method with a parameter named age', () => {
    expect(reflectedPersonFunctionSyntax.methods[0].name).toBe('setAge');
    expect(reflectedPersonFunctionSyntax.methods[0].numberOfParameters).toBe(1);
    expect(reflectedPersonFunctionSyntax.methods[0].parameters[0].name).toBe('age');
  });

  it('class syntax: should contain setAge method with a parameter named age', () => {
    expect(reflectedPersonClassSyntax.methods[0].name).toBe('setAge');
    expect(reflectedPersonClassSyntax.methods[0].numberOfParameters).toBe(1);
    expect(reflectedPersonClassSyntax.methods[0].parameters[0].name).toBe('age');
  });

  it('function syntax: should contain getIntroduction method without any parameters', () => {
    expect(reflectedPersonFunctionSyntax.methods[1].name).toBe('getIntroduction');
    expect(reflectedPersonFunctionSyntax.methods[1].numberOfParameters).toBe(0);
  });

  it('class syntax: should contain getIntroduction method without any parameters', () => {
    expect(reflectedPersonClassSyntax.methods[1].name).toBe('getIntroduction');
    expect(reflectedPersonClassSyntax.methods[1].numberOfParameters).toBe(0);
  });

  it('should throw an error when an invalid object is passed', () => {
    expect(() => new ReflectionClass(invalidObject)).toThrow();
  });
});
