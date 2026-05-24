import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().trim().min(1, 'Введите email').email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен быть не короче 6 символов'),
});

export type TLoginFormValues = z.infer<typeof loginFormSchema>;

export const registerFormSchema =
  z
    .object({
      name: z.string().trim().min(2, 'Введите имя, минимум 2 символа'),
      email: z
        .string()
        .trim()
        .min(1, 'Введите email')
        .email('Введите корректный email'),
      password: z.string().min(6, 'Пароль должен быть не короче 6 символов'),
      confirmPassword: z.string().min(6, 'Повторите пароль'),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: 'Пароли должны совпадать',
      path: ['confirmPassword'],
    });

export type TRegisterFormValues = z.infer<typeof registerFormSchema>;
