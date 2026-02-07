import {Utils} from '../src/Utils';

describe('Object Oriented Programming', () => {
  it('class and constructor', () => {
    // class and constructor
    class Student {
      // constructor initializer
      constructor(
        public name: string,
        public age: number,
        public grade: string,
      ) {}

      getDetails(): string {
        return `Name: ${this.name}, Age: ${this.age}, Grade ${this.grade}`;
      }
    }

    const student = new Student('Grace', 26, 'A');
    student.getDetails();

    expect(student.name).toBe('Grace');
    expect(student.getDetails).toBeDefined();
    expect(student.getDetails()).toBe('Name: Grace, Age: 26, Grade A');
  });

  it('property', () => {
    // property
    class Car {
      // property
      brand: string;
      color: string;
      speed: number;

      constructor(brand: string, color: string, speed: number) {
        this.brand = brand;
        this.color = color;
        this.speed = speed;
      }

      showDetails(): string {
        return `Brand ${this.brand}, Color ${this.color}, Speed ${this.speed}`;
      }
    }

    const myCar = new Car('Toyota', 'Silver', 150);
    myCar.showDetails();

    expect(myCar.brand).toBe('Toyota');
    expect(myCar.showDetails).toBeDefined();
    expect(myCar.showDetails()).toBe('Brand Toyota, Color Silver, Speed 150');
  });

  it('property initialization', () => {
    // property initialization
    class Person {
      name: string = 'Guest';
    }

    const person: Person = new Person();
    expect(person.name).toBe('Guest');

    class User {
      name: string;

      constructor(name: string) {
        this.name = name;
      }
    }

    const user: User = new User('Guest');
    expect(user.name).toBe('Guest');
  });

  it('property with access modifier', () => {
    // property access modifiers
    // public
    class Person {
      public name: string;

      constructor(name: string) {
        this.name = name;
      }

      greet(): string {
        return `Hello, My name is ${this.name}`;
      }
    }

    const person = new Person('Angelina');
    person.greet();

    expect(person.greet).toBeDefined();
    expect(person.name).toBe('Angelina');

    // private
    class BankAccount {
      private balance: number;

      constructor(initialBalance: number) {
        this.balance = initialBalance;
      }

      // Method for getting balance
      getBalance(): number {
        return this.balance;
      }

      deposit(amount: number): void {
        this.balance += amount;
      }
    }

    const account = new BankAccount(1000);
    // console.log(account.balance) Error: Property 'balance' is private

    expect(account.getBalance()).toBe(1000);

    // protected
    class Employee {
      protected salary: number;

      constructor(salary: number) {
        this.salary = salary;
      }
    }

    class Manager extends Employee {
      getSalary(): number {
        return this.salary;
      }
    }

    const manager = new Manager(5000);
    // console.log(manager.salary) Error: Property 'salary' is protected

    expect(manager.getSalary()).toBe(5000);
  });

  it('static property', () => {
    // static property
    class MathUtils {
      static PI: number = 3.14;

      static calculateCircumference(radius: number): number {
        return 2 * this.PI * radius;
      }
    }

    expect(MathUtils.PI).toBe(3.14);
    expect(MathUtils.calculateCircumference(10)).toBeCloseTo(62.8, 1);
  });

  it('readonly property', () => {
    // readonly property
    class User {
      readonly id: number;
      name: string;

      constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
      }
    }

    const user: User = new User(1, 'Grace');
    expect(user.id).toBe(1);
    expect(user.name).toBe('Grace');

    //user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
  });

  it('optional property', () => {
    // optional property
    class Product {
      name: string;
      price?: number;

      constructor(name: string, price?: number) {
        this.name = name;
        this.price = price;
      }
    }

    const product1 = new Product('Laptop', 1000);
    const product2 = new Product('Mouse');

    expect(product1.name).toBe('Laptop');
    expect(product1.price).toBe(1000);
    expect(product2.name).toBe('Mouse');
    expect(product2.price).toBeUndefined();
  });

  it('getter and setter property', () => {
    // getter and setter property
    class User {
      private _password: string;

      constructor(password: string) {
        this._password = password;
      }

      // getter
      get password(): string {
        return this._password;
      }

      // setter
      set password(newPassword: string) {
        if (newPassword.length >= 8) {
          this._password = newPassword;
        } else {
          console.log('Password must be at least 8 characters');
        }
      }
    }

    const user = new User('initial123');
    expect(user.password).toBe('initial123');

    user.password = 'user1234';
    expect(user.password).toBe('user1234');

    user.password = 'user';
    expect(user.password).toBe('user1234');
  });

  it('method, method parameter, return type', () => {
    // method, method parameter, return type
    // method, return type
    class Person {
      name: string;

      constructor(name: string) {
        this.name = name;
      }

      // method
      greet(): string {
        return `Hello, my name is ${this.name}`;
      }
    }

    const person: Person = new Person('Angelina');
    expect(person.greet()).toBe('Hello, my name is Angelina');

    // method parameter, return type
    class Calculator {
      add(a: number, b: number): number {
        return a + b;
      }
    }

    const calc: Calculator = new Calculator();
    expect(calc.add(2, 5)).toBe(7);
  });

  it('method with access modifiers', () => {
    // method with access modifiers
    // public
    class User {
      name: string;

      constructor(name: string) {
        this.name = name;
      }

      public greet(): string {
        return `Hello, ${this.name}`;
      }
    }

    const user: User = new User('Alice');
    expect(user.greet()).toBe('Hello, Alice');

    // private
    class BankAccount {
      private balance: number;

      constructor(initialBalance: number) {
        this.balance = initialBalance;
      }

      private logTransaction(amount: number): string {
        return `Transaction: ${amount}`;
      }

      deposit(amount: number): string {
        this.balance += amount;
        return this.logTransaction(amount);
      }
    }

    const account: BankAccount = new BankAccount(1000);
    expect(account.deposit(500)).toBe('Transaction: 500');

    // protected
    class Vehicle {
      protected startEngine(): string {
        return 'Engine started';
      }
    }

    class Car extends Vehicle {
      drive(): string {
        return this.startEngine();
      }
    }

    const car: Car = new Car();
    expect(car.drive()).toBe('Engine started');

    // static
    class MathUtils {
      static add(a: number, b: number): number {
        return a + b;
      }
    }

    expect(MathUtils.add(3, 3)).toBe(6);
  });

  it('getter and setter (accessor method)', () => {
    // getter and setter (accessor method)
    class Person {
      private _name: string;

      constructor(name: string) {
        this._name = name;
      }

      get name(): string {
        return this._name;
      }

      set name(name: string) {
        if (name.length > 1) {
          this._name = name;
        } else {
          console.log('Name cannot be empty.');
        }
      }
    }

    const person: Person = new Person('Grace');
    expect(person.name).toBe('Grace');

    person.name = 'Angelina';
    expect(person.name).not.toBe('Grace');
    expect(person.name).toBe('Angelina');
  });

  it('method overloading', () => {
    // method overloading
    class Printer {
      print(value: string): string;
      print(value: number): number;
      print(value: any): any {
        return value;
      }
    }

    const printer: Printer = new Printer();
    expect(printer.print('Hello Grace')).toBe('Hello Grace');
    expect(printer.print(26)).toBe(26);
  });

  it('inheritance', () => {
    // inheritance
    // superclass
    class Animal {
      name: string;

      constructor(name: string) {
        this.name = name;
      }

      move(): string {
        return `${this.name} is moving`;
      }
    }

    // subclass
    class Dog extends Animal {
      bark(): string {
        return `${this.name} is barking`;
      }
    }

    const dog: Dog = new Dog('Buddy');
    expect(dog.move()).toBe('Buddy is moving');
    expect(dog.bark()).toBe('Buddy is barking');
  });

  it('overriding method', () => {
    // superclass
    class Animal {
      name: string;

      constructor(name: string) {
        this.name = name;
      }

      move(): string {
        return `${this.name} is moving`;
      }
    }

    // subclass
    class Bird extends Animal {
      move(): string {
        return `${this.name} is flying`;
      }
    }

    const bird: Bird = new Bird('Parrot');
    expect(bird.move()).toBe('Parrot is flying');
  });

  it('super constructor', () => {
    // super constructor
    class Animal {
      name: string;

      constructor(name: string) {
        this.name = name;
      }
    }

    class Cat extends Animal {
      breed: string;

      constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
      }

      meow(): string {
        return `${this.name}, a ${this.breed}, is meowing`;
      }
    }

    const cat: Cat = new Cat('Mittens', 'Siamese');
    expect(cat.meow()).toBe('Mittens, a Siamese, is meowing');
  });

  it('multilevel inheritance', () => {
    // multilevel inheritance
    class LivingThing {
      breathe(): string {
        return 'Breathing...';
      }
    }

    class Animal extends LivingThing {
      move(): string {
        return 'Moving...';
      }
    }

    class Fish extends Animal {
      swim(): string {
        return 'Swimming...';
      }
    }

    const fist: Fish = new Fish();
    expect(fist.breathe()).toBe('Breathing...');
    expect(fist.move()).toBe('Moving...');
    expect(fist.swim()).toBe('Swimming...');
  });

  it('abstract class', () => {
    // abstract class
    abstract class Animal {
      // abstract property (must be implemented by subclass)
      protected abstract color: string;

      // abstract method (must be implemented by subclass)
      abstract makeSound(): string;

      constructor(public name: string) {}

      move(): string {
        return `${this.name} is moving...`;
      }
    }

    class Dog extends Animal {
      color: string;

      constructor(name: string, color: string) {
        super(name);
        this.color = color;
      }

      makeSound(): string {
        return 'Bark!';
      }
    }

    const dog: Dog = new Dog('Buddy', 'brown');
    expect(dog.move()).toBe('Buddy is moving...');
    expect(dog.makeSound()).toBe('Bark!');
    expect(dog.color).toBe('brown');
  });

  it('abstract with setter and getter', () => {
    // abstract with setter and getter
    abstract class Vehicle {
      abstract get brand(): string;
      abstract set brand(value: string);

      setEngine(): string {
        return `Starting engine of ${this.brand}`;
      }
    }

    class Car extends Vehicle {
      private _brand: string;

      constructor(brand: string) {
        super();
        this._brand = brand;
      }

      get brand(): string {
        return this._brand;
      }

      set brand(value: string) {
        this._brand = value;
      }
    }

    const car: Car = new Car('Toyota');
    expect(car.setEngine()).toBe('Starting engine of Toyota');

    car.brand = 'Honda';
    expect(car.setEngine()).not.toBe('Starting engine of Toyota');
    expect(car.setEngine()).toBe('Starting engine of Honda');
  });

  it('multiple interface', () => {
    // multiple interface
    interface Animal {
      name: string;
      makeSound(): string;
    }

    interface Pet {
      play(): string;
    }

    class Cat implements Animal, Pet {
      name: string;

      constructor(name: string) {
        this.name = name;
      }

      makeSound(): string {
        return `${this.name} says Meow!`;
      }

      play(): string {
        return `${this.name} is playing with a ball.`;
      }
    }

    const cat: Cat = new Cat('whiskers');
    expect(cat.makeSound()).toBe(`whiskers says Meow!`);
    expect(cat.play()).toBe(`whiskers is playing with a ball.`);
  });

  it('extends interface', () => {
    // extends interface
    interface Vehicle {
      brand: string;
      startEngine(): string;
    }

    interface ElectricVehicle extends Vehicle {
      chargeBattery(): string;
    }

    class Tesla implements ElectricVehicle {
      brand: string;

      constructor(brand: string) {
        this.brand = brand;
      }

      startEngine(): string {
        return `${this.brand} engine is starting...`;
      }

      chargeBattery(): string {
        return `${this.brand} is charging its battery...`;
      }
    }

    const tesla: Tesla = new Tesla('Tesla Model S');
    expect(tesla.brand).toBe('Tesla Model S');
    expect(tesla.chargeBattery()).toBe(
      'Tesla Model S is charging its battery...',
    );
    expect(tesla.startEngine()).toBe('Tesla Model S engine is starting...');
  });

  it('instanceof', () => {
    // instanceof
    class Animal {
      name: string;

      constructor(name: string) {
        this.name = name;
      }
    }

    class Dog extends Animal {}

    const dog: Dog = new Dog('Buddy');

    expect(dog instanceof Dog).toBeTruthy();
    expect(dog instanceof Animal).toBeTruthy();
    expect(dog instanceof Array).toBeFalsy();
  });

  it('namespace', () => {
    // namespace
    // import {Utils} from '../src/Utils';
    expect(Utils.add(2, 2)).toBe(4);
    expect(Utils.subtract(4, 2)).toBe(2);
  });
});
