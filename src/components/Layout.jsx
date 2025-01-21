import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div style={{
      minHeight: '100vh',
      paddingBlockEnd: '5.5rem',
      position: 'relative'
    }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}