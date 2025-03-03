import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/auth/login'); // ログインページにリダイレクト
  return <div>loginページに自動的にリダイレクトします</div>;
}
