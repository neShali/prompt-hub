import { loginFormSchema, registerFormSchema } from './schemas';

describe('auth form schemas', () => {
  it('принимает корректные данные входа', () => {
    const result = loginFormSchema.safeParse({
      email: 'user@example.com',
      password: 'secret123',
    });

    expect(result.success).toBe(true);
  });

  it('проверяет совпадение паролей при регистрации', () => {
    const result = registerFormSchema.safeParse({
      name: 'Алексей',
      email: 'user@example.com',
      password: 'secret123',
      confirmPassword: 'another123',
    });

    expect(result.success).toBe(false);
  });
});
