import Folowers from '../folowers/Folowers';
import Followings from '../following/Following';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Routing from '../routing/Routing';
import './Layout.css';
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
        <div className="Layout">
            <header>
                <Header />
            </header>
            <aside>
                <Followings />
            </aside>
            <aside>
                <Folowers />
            </aside>
            <main>
                <Routing />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
