import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <main>{children}</main>
      <Footer/>
    </div>
  );
}
