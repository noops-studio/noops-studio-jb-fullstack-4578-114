import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../../posts/profile/Profile";
import Feed from "../../posts/feed/Feed";
import NotFound from "../not-found/NotFound";
import LoginPage from "../login/login";

// Utility function to check if the user is authenticated
const isAuthenticated = (): boolean => {
    // Look for the presence of the 'auth' cookie
    return document.cookie.split('; ').some((cookie) => cookie.startsWith('auth='));
};

export default function Routing(): JSX.Element {
    return (
        <Routes>
            {/* Protected routes */}
            <Route
                path="/profile"
                element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
                path="/feed"
                element={isAuthenticated() ? <Feed /> : <Navigate to="/login" />}
            />
            
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Catch-all for undefined routes */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
