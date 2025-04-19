import { Header } from '../components/Header';

export default function WithHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header isLoggedIn={true} />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 container">
        {children}
      </main>
    </>
  );
}
