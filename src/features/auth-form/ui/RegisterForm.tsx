'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  registerFormSchema,
  TRegisterFormValues,
} from '@/features/auth-form/model/schemas';
import { consumeNextPath, setCurrentUser } from '@/features/auth-form/model/session';

import styles from './AuthForm.module.css';

const defaultValues: TRegisterFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

type TRegisterTextField = keyof TRegisterFormValues;

export function RegisterForm() {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState('');
  const [formSnapshot, setFormSnapshot] = useState<TRegisterFormValues>(defaultValues);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
    defaultValues,
  });

  const isFormValid = registerFormSchema.safeParse(formSnapshot).success;

  const updateField =
    (field: TRegisterTextField) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setFormSnapshot((currentValues) => ({
        ...currentValues,
        [field]: value,
      }));
    };

  const onSubmit = async (values: TRegisterFormValues) => {
    setSubmitMessage('');
    await new Promise((resolve) => window.setTimeout(resolve, 250));

    setCurrentUser({
      name: values.name,
      email: values.email,
      authorizedAt: new Date().toISOString(),
    });

    const nextPath = consumeNextPath();

    setSubmitMessage('Аккаунт создан. Открываем личный кабинет.');
    router.push(nextPath ?? '/profile');
  };

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="name">Имя</label>
        <input
          aria-describedby={errors.name ? 'register-name-error' : undefined}
          aria-invalid={Boolean(errors.name)}
          autoComplete="name"
          id="name"
          placeholder="Ваше имя"
          type="text"
          {...register('name', { onChange: updateField('name') })}
        />
        {errors.name ? (
          <p className={styles.error} id="register-name-error" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          aria-describedby={errors.email ? 'register-email-error' : undefined}
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          id="email"
          placeholder="name@example.com"
          type="email"
          {...register('email', { onChange: updateField('email') })}
        />
        {errors.email ? (
          <p className={styles.error} id="register-email-error" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Пароль</label>
        <input
          aria-describedby={errors.password ? 'register-password-error' : undefined}
          aria-invalid={Boolean(errors.password)}
          autoComplete="new-password"
          id="password"
          placeholder="Минимум 6 символов"
          type="password"
          {...register('password', { onChange: updateField('password') })}
        />
        {errors.password ? (
          <p className={styles.error} id="register-password-error" role="alert">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="confirmPassword">Повторите пароль</label>
        <input
          aria-describedby={errors.confirmPassword ? 'register-confirm-password-error' : undefined}
          aria-invalid={Boolean(errors.confirmPassword)}
          autoComplete="new-password"
          id="confirmPassword"
          placeholder="Введите пароль ещё раз"
          type="password"
          {...register('confirmPassword', {
            onChange: updateField('confirmPassword'),
          })}
        />
        {errors.confirmPassword ? (
          <p className={styles.error} id="register-confirm-password-error" role="alert">
            {errors.confirmPassword.message}
          </p>
        ) : null}
      </div>

      <button className={styles.submitButton} disabled={!isFormValid || isSubmitting} type="submit">
        {isSubmitting ? 'Создаём аккаунт' : 'Зарегистрироваться'}
      </button>

      {submitMessage ? (
        <p className={styles.success} role="status" aria-live="polite">
          {submitMessage}
        </p>
      ) : null}

      <p className={styles.bottomText}>
        Уже есть аккаунт? <Link href="/login">Войти</Link>
      </p>
    </form>
  );
}
