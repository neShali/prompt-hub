import type { Metadata } from 'next';

import { Footer } from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';

import './globals.css';

export const metadata: Metadata = {
  title: 'PromptHub',
  description:
    'Сервис для изучения промпт-инжиниринга, создания шаблонов и работы с каталогом промптов.',
};

type TRootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: TRootLayoutProps) {
  return (
    <html lang="ru">
      <body>
        <div className="appShell">
          <Header />
          <main className="mainContent">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
