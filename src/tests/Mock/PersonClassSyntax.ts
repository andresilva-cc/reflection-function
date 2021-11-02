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

export default PersonClassSyntax;
