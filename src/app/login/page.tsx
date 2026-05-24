import { LoginForm } from '@/features/auth-form/ui/LoginForm';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from '../auth.module.css';

export default function LoginPage() {
  return (
    <section className="pageSection">
      <div className="container">
        <Breadcrumbs />

        <div className={styles.layout}>
          <div className={styles.hero}>
            <span className="badge">Авторизация</span>
            <h1>Вход в личный кабинет</h1>
            <p>
              После входа пользователь получает доступ к созданию шаблонов,
              избранному и управлению своими материалами. На этом этапе авторизация
              имитируется через localStorage.
            </p>
          </div>

          <div className={styles.formCard}>
            <h2>Введите данные</h2>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
