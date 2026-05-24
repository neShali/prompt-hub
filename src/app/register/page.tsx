import { RegisterForm } from '@/features/auth-form/ui/RegisterForm';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from '../auth.module.css';

export default function RegisterPage() {
  return (
    <section className="pageSection">
      <div className="container">
        <Breadcrumbs />

        <div className={styles.layout}>
          <div className={styles.hero}>
            <span className="badge">Регистрация</span>
            <h1>Создание аккаунта</h1>
            <p>
              Зарегистрируйтесь, чтобы сохранять собственные шаблоны, возвращаться
              к избранным промптам и управлять личной коллекцией материалов.
            </p>
          </div>

          <div className={styles.formCard}>
            <h2>Заполните форму</h2>
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
