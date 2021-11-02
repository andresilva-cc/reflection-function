/* eslint-disable func-names */

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

export default Person;
