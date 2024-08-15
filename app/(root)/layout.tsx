import { Header } from '@/components/shared/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
};
export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header className=""></Header>
      {children}
      {modal}
    </main>
  );
}
