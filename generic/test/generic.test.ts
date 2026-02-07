describe('Generic', () => {
  it('generic function', () => {
    // generic function
    function wrapInArray<T>(value: T): T[] {
      return [value];
    }

    const numberArray = wrapInArray(5);
    const stringArray = wrapInArray<string>('Grace');

    expect(numberArray).toStrictEqual([5]);
    expect(stringArray).toStrictEqual(['Grace']);
  });

  it('generic class', () => {
    // generic class

    class Stack<T> {
      private items: T[] = [];

      push(item: T): void {
        this.items.push(item);
      }

      pop(): T | undefined {
        return this.items.pop();
      }
    }

    const numberStack = new Stack<number>();
    numberStack.push(1);
    numberStack.push(2);
    numberStack.push(4);

    expect(numberStack.pop()).toBe(4);
  });

  it('generic interface', () => {
    interface ApiResponse<T> {
      data: T;
      status: number;
    }

    const userResponse: ApiResponse<{ name: string; age: number }> = {
      data: { name: 'Grace', age: 25 },
      status: 200,
    };

    expect(userResponse.status).toBe(200);
    expect(userResponse.data).toStrictEqual({ name: 'Grace', age: 25 });
  });

  it('two type generic', () => {
    function merge<T, U>(a: T, b: U): T & U {
      return { ...a, ...b };
    }

    const mergeObject = merge({ name: 'Angeline' }, { age: 25 });
    expect(mergeObject).toStrictEqual({ name: 'Angeline', age: 25 });
  });

  it('constrain generic', () => {
    // constrain generic
    function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
      return obj[key];
    }

    const person = { name: 'Grace', age: 25 };
    expect(getProperty(person, 'name')).toBe('Grace');
  });

  it('default value generic', () => {
    // default value generic

    function getValue<T extends object = {}>(obj?: T): T {
      return obj || ({} as T);
    }

    expect(getValue()).toStrictEqual({});
    expect(getValue({ name: 'Angeline', age: 24 })).toStrictEqual({
      name: 'Angeline',
      age: 24,
    });
  });
});
