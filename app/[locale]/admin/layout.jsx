
import Layout from '@/components/layout'
export default function ProtectedLayout({ children }) {
  return (
    <div >
        <Layout>
        <main>{children}</main>
        </Layout>
    </div>
  );
}
