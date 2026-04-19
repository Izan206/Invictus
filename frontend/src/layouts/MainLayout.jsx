import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      <main className="flex-grow pt-32">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
