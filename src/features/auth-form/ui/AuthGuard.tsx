'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { getCurrentUser, setNextPath } from '@/features/auth-form/model/session';

import styles from './AuthGuard.module.css';

type TAuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: TAuthGuardProps) {
  const pathname = usePathname();
  const [isAllowed, setIsAllowed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      setNextPath(pathname);
      setIsAllowed(false);
      setIsChecked(true);
      return;
    }

    setIsAllowed(true);
    setIsChecked(true);
  }, [pathname]);

  if (!isChecked) {
    return (
      <div className={styles.guardCard} role="status" aria-live="polite">
        Проверяем доступ к личному кабинету
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className={styles.guardCard}>
        <h1>Войдите в аккаунт</h1>
        <p>Личный кабинет, избранное и создание шаблонов доступны после входа.</p>
        <Link className="primaryLink" href="/login">
          Войти
        </Link>
      </div>
    );
  }

  return children;
}
