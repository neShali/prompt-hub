import { AuthGuard } from '@/features/auth-form/ui/AuthGuard';
import { ProfileSidebar } from '@/widgets/ProfileSidebar/ProfileSidebar';

import styles from './profile.module.css';

type TProfileLayoutProps = {
  children: React.ReactNode;
};

export default function ProfileLayout({ children }: TProfileLayoutProps) {
  return (
    <div className="pageSection">
      <div className="container">
        <AuthGuard>
          <div className={styles.layout}>
            <ProfileSidebar />
            <div>{children}</div>
          </div>
        </AuthGuard>
      </div>
    </div>
  );
}
