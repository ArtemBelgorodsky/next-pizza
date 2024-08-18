import { Header } from '@/shared/components/shared/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
};
export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header className=""></Header>
      {children}
      {modal}
    </main>
  );
}
