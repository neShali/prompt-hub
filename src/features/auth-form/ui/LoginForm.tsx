'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  loginFormSchema,
  TLoginFormValues,
} from '@/features/auth-form/model/schemas';
import { consumeNextPath, setCurrentUser } from '@/features/auth-form/model/session';

import styles from './AuthForm.module.css';

const defaultValues: TLoginFormValues = {
  email: '',
  password: '',
};

type TLoginTextField = keyof TLoginFormValues;

export function LoginForm() {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState('');
  const [formSnapshot, setFormSnapshot] = useState<TLoginFormValues>(defaultValues);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues,
  });

  const isFormValid = loginFormSchema.safeParse(formSnapshot).success;

  const updateField = (field: TLoginTextField) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setFormSnapshot((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const onSubmit = async (values: TLoginFormValues) => {
    setSubmitMessage('');
    await new Promise((resolve) => window.setTimeout(resolve, 250));

    setCurrentUser({ email: values.email, authorizedAt: new Date().toISOString() });

    const nextPath = consumeNextPath();

    setSubmitMessage('Вход выполнен. Открываем личный кабинет.');
    router.push(nextPath ?? '/profile');
  };

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          id="email"
          placeholder="name@example.com"
          type="email"
          {...register('email', { onChange: updateField('email') })}
        />
        {errors.email ? (
          <p className={styles.error} role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Пароль</label>
        <input
          aria-invalid={Boolean(errors.password)}
          autoComplete="current-password"
          id="password"
          placeholder="Минимум 6 символов"
          type="password"
          {...register('password', { onChange: updateField('password') })}
        />
        {errors.password ? (
          <p className={styles.error} role="alert">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <button className={styles.submitButton} disabled={!isFormValid || isSubmitting} type="submit">
        {isSubmitting ? 'Проверяем данные' : 'Войти'}
      </button>

      {submitMessage ? (
        <p className={styles.success} role="status" aria-live="polite">
          {submitMessage}
        </p>
      ) : null}

      <p className={styles.bottomText}>
        Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
      </p>
    </form>
  );
}
