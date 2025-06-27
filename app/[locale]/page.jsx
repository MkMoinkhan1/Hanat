import { redirect } from 'next/navigation';

export default async function Home({ params }) {
  const { locale } = await params;
  redirect(`/${locale}/admin/dashboard`);
}
