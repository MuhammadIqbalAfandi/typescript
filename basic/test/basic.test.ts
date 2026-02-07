describe('Basic', () => {
  it('type data primitive', () => {
    // primitive type data
    let name: string = 'Hello Iqbal';
    let age: number = 24;
    let male: boolean = true;
    let birthDay: any = '30 April 2000';

    expect(age).toBe(24);
    expect(male).toBeTruthy();

    let value: unknown = 'Grace';
    if (typeof value === 'string') {
      expect(value.length).toBe(5);
    }
  });

  it('array, tuple, union', () => {
    // array
    const fruits: string[] = ['apple', 'orange', 'guava'];
    const numbers: number[] = [1, 2, 3];
    const booleans: boolean[] = [true, false];

    const languages: ReadonlyArray<string> = ['typescript', 'c#', 'php'];

    expect(fruits).toContain('apple');
    expect(booleans[1]).toBeFalsy();

    // tuple
    const tiger: [string, number, boolean] = ['Roar', 13, true];

    expect(tiger[1]).toBe(13);
    expect(tiger[2]).toBeTruthy();

    // union
    function process(value: string | number | boolean) {
      if (typeof value == 'string') {
        return value.toUpperCase();
      } else if (typeof value == 'number') {
        return value + 2;
      } else {
        return value;
      }
    }

    expect(process('Hello')).toBe('HELLO');
    expect(process(2)).toBe(4);
  });

  it('type alias', () => {
    // type alias
    type Point = {
      x: number;
      y: number;
    };

    function printCoord(pt: Point): string {
      return 'Coordinate x value: ' + pt.x + ' Coordinate y value: ' + pt.y;
    }

    expect(printCoord({x: 20, y: 30})).toBe(
      'Coordinate x value: 20 Coordinate y value: 30',
    );

    type ID = string | number;

    function findBy(id: ID): string {
      return 'Hello Boos from id ' + id;
    }

    expect(findBy(19)).toBe('Hello Boos from id 19');

    // type alias with optional value
    type StaffProgrammer = [number, string, string?];

    const staff: StaffProgrammer[] = [
      [0, 'angelina', 'angelina@admin.com'],
      [1, 'grace'],
    ];

    expect(staff[0][2]).toBe('angelina@admin.com');
    expect(staff[1][2]).toBeUndefined();
  });

  it('type object', () => {
    // type object
    function printCoord(pt: {x: number | string; y: number | string}) {
      return 'Coordinate x value: ' + pt.x + ' Coordinate y value: ' + pt.y;
    }

    expect(printCoord({x: 20, y: 30})).toBe(
      'Coordinate x value: 20 Coordinate y value: 30',
    );

    type Person = {id: string | number; name: string; email: string};

    const person: Person = {
      id: 1,
      name: 'angelina',
      email: 'angelina@admin.com',
    };

    expect(person.id).toBe(1);
    expect(person.name).toBe('angelina');

    // type object with optional value
    function printCoord2(x: number, y: number, describe?: string) {
      return (
        'Coordinate x value: ' +
        x +
        ' Coordinate y value: ' +
        y +
        ' describe: ' +
        describe
      );
    }

    expect(printCoord2(10, 10)).toBe(
      'Coordinate x value: 10 Coordinate y value: 10 describe: undefined',
    );

    expect(printCoord2(10, 10, 'This is point')).toBe(
      'Coordinate x value: 10 Coordinate y value: 10 describe: This is point',
    );
  });

  it('enum', () => {
    // enum
    enum MemberLevel {
      GOLD = 'GOLD',
      SILVER = 'SILVER',
      BROWN = 'MEMBER',
    }

    expect(MemberLevel.GOLD).toBe('GOLD');

    enum Direction {
      UP = 1,
      DOWN,
      LEFT,
      RIGHT,
    }

    expect(Direction.RIGHT).toBe(4);

    function checkAccess(level?: MemberLevel): string {
      if (level === MemberLevel.GOLD) {
        return `Your level is ${MemberLevel.GOLD}, you can access all course premium`;
      } else if (level === MemberLevel.SILVER) {
        return `Your level is ${MemberLevel.SILVER}, your can access course premium but 1 month`;
      } else if (level === MemberLevel.BROWN) {
        return `Your level is ${MemberLevel.BROWN}, your can access free course`;
      } else {
        return 'upp your level is not found';
      }
    }

    expect(checkAccess(MemberLevel.GOLD)).toBe(
      'Your level is GOLD, you can access all course premium',
    );
    expect(checkAccess()).toBe('upp your level is not found');
  });

  it('null and undefined', () => {
    // null, undefined
    function greet(name?: string): string {
      return `Hello ${name}`;
    }

    expect(greet('muhammad')).toBe('Hello muhammad');
    expect(greet()).toBe('Hello undefined');

    function createUser(
      id: number,
      name: string,
      email: string | null,
    ): string {
      let emailStatus: string;
      if (email === null) {
        emailStatus = 'not found';
      } else {
        emailStatus = email;
      }

      return `user has been created with id ${id}, name ${name} and optional email ${emailStatus}`;
    }

    expect(createUser(1, 'grace', null)).toBe(
      'user has been created with id 1, name grace and optional email not found',
    );
  });

  it('interface', () => {
    // interface
    // interface optional
    interface User {
      id: string | number;
      name: string;
      email?: string;
    }

    const user: User = {
      id: 1,
      name: 'angelina',
      email: 'angelina@admim.com',
    };

    expect(user.name).toBe('angelina');

    // interface readonly
    interface Cars {
      readonly brand: string;
      model: string;
    }

    const car: Cars = {
      brand: 'Toyota',
      model: 'Corolla',
    };

    // car.brand = 'Honda'
    expect(car.brand).toBe('Toyota');

    // interface function
    interface AddFunction {
      (a: number, b: number): number;
    }

    const add: AddFunction = (a, b) => {
      return a + b;
    };

    expect(add(2, 3)).toBe(5);

    // interface extends
    interface Person {
      name: string;
      age: string | number;
    }

    interface Employee extends Person {
      jobTitle: string;
    }

    const employee: Employee = {
      name: 'grace',
      age: 24,
      jobTitle: 'react developer',
    };

    expect(employee.name).toBe('grace');

    // interface array
    interface StringArray {
      [key: number]: string;
    }

    const fruit: StringArray = ['apple', 'mango', 'melon', 'banana'];

    expect(fruit[3]).toBe('banana');

    interface NumberKeyArray {
      [key: string]: string;
    }

    const fruitName: NumberKeyArray = {
      apple: 'Apple',
    };

    expect(fruitName.apple).toBe('Apple');
  });

  it('intersection', () => {
    // intersection
    interface Person3 {
      name: string;
    }

    interface Employee3 {
      employeeId: number;
    }

    type PersonEmployee3 = Person3 & Employee3;

    const personEmployee2: PersonEmployee3 = {
      name: 'muhammad',
      employeeId: 1,
    };

    console.log(personEmployee2);
  });

  it('type assertion', () => {
    // type assertion
    let value: any = 'Hello, Typescript';
    let strLength: number = (value as string).length;
    // let strLength: number = (<string>value).length

    console.log(strLength);
  });

  it('function', () => {
    // function
    // function return value
    function multiply(a: number, b: number): number {
      return a * b;
    }

    expect(multiply(2, 8)).toBe(16);

    // function return void
    function logMessage(msg: string): void {
      console.log(msg);
    }

    logMessage('login success');

    // function default parameter
    function greet(name: string = 'Guest'): string {
      return `Hello ${name}`;
    }

    expect(greet('Grace')).toBe('Hello Grace');

    // function rest parameter
    function sum(...numbers: number[]): number {
      return numbers.reduce((prev, next) => prev + next, 0);
    }

    expect(sum(1, 2, 3, 4, 5)).toBe(15);

    // arrow function
    // const sub = (a: number, b: number): number => {
    //     return a/b
    // }

    const sub = (a: number, b: number): number => a / b;

    expect(sub(4, 2)).toBe(2);

    // function type
    let myFunc: (a: number, b: number) => number;

    myFunc = function (x: number, y: number): number {
      return x + y;
    };

    expect(myFunc(2, 3)).toBe(5);

    // overloading function
    function add(a: number, b: number): number;
    function add(a: string, b: string): string;

    function add(a: any, b: any): any {
      return a + b;
    }

    expect(add(3, 3)).toBe(6);
    expect(add('gra', 'ce')).toBe('grace');
  });
});
