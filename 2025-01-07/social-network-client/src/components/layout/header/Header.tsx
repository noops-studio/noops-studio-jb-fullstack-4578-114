import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <div className="Header">
            <div>
                <img
                    src="https://cdn.ozari.co.il/beery/noop.jpeg"
                    className="logob"
                    alt="Logo"
                />
            </div>
            <nav>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                    }
                >
                    Profile
                </NavLink>
                <NavLink
                    to="/feed"
                    className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                    }
                >
                    Feed
                </NavLink>
            </nav>
        </div>
    );
}
