import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login'); // ログインページにリダイレクト
  return <div>loginページに自動的にリダイレクトします</div>;
}
