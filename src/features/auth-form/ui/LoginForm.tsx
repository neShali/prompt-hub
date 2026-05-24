'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  loginFormSchema,
  TLoginFormValues,
} from '@/features/auth-form/model/schemas';

import styles from './AuthForm.module.css';

export function LoginForm() {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: TLoginFormValues) => {
    setSubmitMessage('');
    await new Promise((resolve) => window.setTimeout(resolve, 450));

    window.localStorage.setItem(
      'prompt-hub:user',
      JSON.stringify({ email: values.email, authorizedAt: new Date().toISOString() })
    );

    setSubmitMessage('Вход выполнен. Сейчас откроется личный кабинет.');
    router.push('/profile');
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
          {...register('email')}
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
          {...register('password')}
        />
        {errors.password ? (
          <p className={styles.error} role="alert">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <button className={styles.submitButton} disabled={!isValid || isSubmitting} type="submit">
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
