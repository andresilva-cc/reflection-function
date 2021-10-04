# Reflection Function

Function reflection for JavaScript and TypeScript.

## About

This package enables you to get the following information about a function:

- Function name
- Name and position of the parameters

It also works with classes, as classes are just special functions. It will give you the following information:

- Class name
- Constructor signature (name and position of the parameters)
- Methods and their respective signatures (name and position of the parameters)

## Installation

```bash
npm install reflection-function
```

## Usage

Here is an example of `ReflectionFunction`:

```typescript
import { ReflectionFunction } from 'reflection-function';

function add(a: number, b: number): number {
  return a + b;
}

const reflected = new ReflectionFunction(add);

console.log(reflected);
```

It outputs:

```bash
ReflectionFunction {
  name: 'add',
  parameters: [
    ReflectionParameter { position: 0, name: 'a' },
    ReflectionParameter { position: 1, name: 'b' }
  ]
}
```

And here is an example of `ReflectionClass`:

```typescript
import { ReflectionClass } from 'reflection-function';

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

const reflected = new ReflectionClass(Person);

console.log(reflected);
```

It outputs:

```bash
ReflectionClass {
  name: 'Person',
  classConstructor: ReflectionFunction {
    name: 'Person',
    parameters: [
      ReflectionParameter { position: 0, name: 'name' },
      ReflectionParameter { position: 1, name: 'age' }
    ]
  },
  methods: [
    ReflectionFunction {
      name: 'setAge',
      parameters: [
        ReflectionParameter { position: 0, name: 'age' }
      ]
    },
    ReflectionFunction { name: 'getIntroduction', parameters: [] }
  ]
}
```

## Development

Install the dependencies:

```bash
npm install
```

All source codes are located in the `src` directory.

### Testing

To run the tests, run in your terminal:

```bash
npm run test
```

To check the code coverage, run in your terminal:

```bash
npm run coverage
```

And then open in the browser the file `coverage/lcov-report/index.html`.

### Building

To build the package, run:

```bash
npm run build
```

The generated JavaScript code is located in the `dist` directory.