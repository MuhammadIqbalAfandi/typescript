import { RefinementCtx, z } from 'zod';

describe('zod validation', () => {
  it('zod basic', () => {
    // zod basic
    const schema = z.string().min(3).max(100);
    const request = 'Grace';
    const result = schema.parse(request);

    expect(result).toBe('Grace');
  });

  it('primitive type validation', () => {
    // primitive type validation
    const usernameSchema = z.string().email();
    const isAdminSchema = z.boolean();
    const priceSchema = z.number().min(1000).max(1000000);

    const username = usernameSchema.parse('grace@gmail.com');
    expect(username).toBe('grace@gmail.com');

    const isAdmin = isAdminSchema.parse(true);
    expect(isAdmin).toBeTruthy();
    expect(isAdmin).not.toBeFalsy();

    const price = priceSchema.parse(35000);
    expect(price).toBe(35000);
  });

  it('type conversion', () => {
    // type conversion
    const isAdminSchema = z.coerce.boolean();
    const priceSchema = z.coerce.number().min(1000).max(1000000);

    const isAdmin = isAdminSchema.parse('true');
    expect(isAdmin).toBeTruthy();
    expect(isAdmin).not.toBeFalsy();

    const price = priceSchema.parse('35000');
    expect(price).toBe(35000);
  });

  it('date validation', () => {
    // date validation
    const birthDateSchema = z.coerce
      .date()
      .min(new Date(1980, 0, 1))
      .max(new Date(2000, 0, 1));

    const birthDate = birthDateSchema.parse('1998-04-30');
    expect(birthDate.toISOString()).toBe('1998-04-30T00:00:00.000Z');
    expect(birthDate.toLocaleDateString('id-ID')).toBe('30/4/1998');
  });

  it('zod error', () => {
    // zod error
    const schema = z.string().email().min(5).max(100);

    try {
      schema.parse('Gra');
    } catch (error) {
      // if (error instanceof ZodError) {
      //   console.log(error);
      //   console.log(error.errors);
      // }
    }
  });

  it('zod error without exception', () => {
    // zod error without exception
    const schema = z.string().email().min(5).max(100);
    const result = schema.safeParse('g');
    if (result.success) {
      expect(result.data).toBe('grace@gmail.com');
    } else {
      expect(result.error?.errors[0].message).toBe('Invalid email');
    }
  });

  it('object validation', () => {
    //object validation
    const loginSchema = z.object({
      username: z.string().email(),
      password: z.string().min(8).max(20),
    });

    const request = {
      username: 'grace@gmail.com',
      password: 'grace123',
    };

    const result = loginSchema.parse(request);
    expect(result.username).toBe('grace@gmail.com');
  });

  it('nested object validation', () => {
    // nested object validation
    type CreateUserSchema = {
      id: string;
      name: string;
      address: {
        city: string;
        country: string;
      };
    };

    const createUserSchema = z.object({
      id: z.string().max(100),
      name: z.string().max(100),
      address: z.object({
        city: z.string().max(100),
        country: z.string().max(100),
      }),
    });

    const request: CreateUserSchema = {
      id: '123',
      name: 'Grace',
      address: {
        city: 'Medan',
        country: 'Indonesia',
      },
    };

    const result = createUserSchema.parse(request);
    expect(result.name).toBe('Grace');
  });

  it('array validation', () => {
    // array validation
    const schema = z.array(z.string()).min(1).max(10);
    const request: Array<string> = ['a', 'b', 'c'];
    const result: Array<string> = schema.parse(request);

    expect(result[0]).toBe('a');
  });

  it('set validation', () => {
    // set validation
    const schema = z.set(z.string()).min(1).max(10);
    const request: Set<string> = new Set(['a', 'b', 'c', 'a', 'b']);
    const result: Set<string> = schema.parse(request);

    expect(result.has('a')).toBeTruthy();
  });

  it('map validation', () => {
    // map validation
    const schema = z.map(z.string(), z.string());
    const request: Map<string, string> = new Map([
      ['name', 'Grace'],
      ['age', '24'],
    ]);
    const result: Map<string, string> = schema.parse(request);

    expect(result.get('name')).toBe('Grace');
  });

  it('custom message schema', () => {
    // custom message schema
    const loginSchema = z.object({
      username: z.string().email('format email tidak benar'),
      password: z.string().min(8, 'minimal password harus 8 character').max(20),
    });

    const request = {
      username: 'grace@gmail.com',
      password: 'grace123',
    };

    const result = loginSchema.parse(request);
    expect(result.username).toBe('grace@gmail.com');
  });

  it('optional validation', () => {
    // optional validation
    const registerSchema = z.object({
      username: z.string().email(),
      password: z.string().min(8).max(20),
      firstName: z.string().min(3).max(25),
      lastName: z.string().min(3).max(25).optional(),
    });

    const request = {
      username: 'grace@gmail.com',
      password: 'grace123',
      firstName: 'Grace Angeline',
    };

    const result = registerSchema.parse(request);
    expect(result.firstName).toBe('Grace Angeline');
  });

  it('transform validation', () => {
    // transform
    const schema = z.string().transform((data) => {
      return data.toUpperCase().trim();
    });

    const result = schema.parse('  Grace  ');
    expect(result).toBe('GRACE');
  });

  it('transform custom validation', () => {
    // transform custom validation
    const schema = z.string().transform((data, ctx: RefinementCtx) => {
      if (data != data.toUpperCase()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'text must be uppercase',
        });

        return z.never;
      } else {
        return data.toUpperCase().trim();
      }
    });

    const result = schema.safeParse('Grace');
    expect(result.success).toBeFalsy();
    expect(result.error?.errors[0].message).toBe('text must be uppercase');
  });
});
