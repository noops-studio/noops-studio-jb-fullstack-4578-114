import Folowers from '../folowers/Folowers';
import Followings from '../following/Following';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Routing from '../routing/Routing';
// import './Layout.css';
import { Navigate } from 'react-router-dom';

// Utility function to check if the user is authenticated
const isAuthenticated = (): boolean => {
    // Look for the presence of the 'auth' cookie
    return document.cookie.split('; ').some((cookie) => cookie.startsWith('auth='));
};
export default function Layout() {
    // Redirect to /login if the user is not authenticated
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
  
    return (
      <div className="grid grid-rows-[auto_1fr_auto] grid-cols-[1fr_3fr] h-screen">
  <header className="col-span-2 row-start-1 bg-gray-100 border border-gray-300">
    <Header />
  </header>

  <aside className="col-start-1 row-start-2 bg-white border border-gray-300 p-4 overflow-y-auto">
    <Followings />
  </aside>

  <aside className="col-start-1 row-start-3 bg-white border border-gray-300 p-4 overflow-y-auto">
    <Folowers />
  </aside>

  <main className="col-start-2 row-start-2 row-span-2 bg-gray-50 border border-gray-300 p-4">
    <div className="h-full overflow-y-auto">
      <Routing />
    </div>
  </main>

  <footer className="col-span-2 row-start-4 bg-gray-800 text-white text-center py-4">
    <Footer />
  </footer>
</div>
    );
  }
  