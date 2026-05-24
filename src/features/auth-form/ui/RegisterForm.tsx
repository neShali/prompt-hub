'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  registerFormSchema,
  TRegisterFormValues,
} from '@/features/auth-form/model/schemas';

import styles from './AuthForm.module.css';

export function RegisterForm() {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: TRegisterFormValues) => {
    setSubmitMessage('');
    await new Promise((resolve) => window.setTimeout(resolve, 450));

    window.localStorage.setItem(
      'prompt-hub:user',
      JSON.stringify({
        name: values.name,
        email: values.email,
        authorizedAt: new Date().toISOString(),
      })
    );

    setSubmitMessage('Аккаунт создан. Сейчас откроется личный кабинет.');
    router.push('/profile');
  };

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="name">Имя</label>
        <input
          aria-invalid={Boolean(errors.name)}
          autoComplete="name"
          id="name"
          placeholder="Ваше имя"
          type="text"
          {...register('name')}
        />
        {errors.name ? (
          <p className={styles.error} role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

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
          autoComplete="new-password"
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

      <div className={styles.field}>
        <label htmlFor="confirmPassword">Повторите пароль</label>
        <input
          aria-invalid={Boolean(errors.confirmPassword)}
          autoComplete="new-password"
          id="confirmPassword"
          placeholder="Введите пароль ещё раз"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword ? (
          <p className={styles.error} role="alert">
            {errors.confirmPassword.message}
          </p>
        ) : null}
      </div>

      <button className={styles.submitButton} disabled={!isValid || isSubmitting} type="submit">
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
