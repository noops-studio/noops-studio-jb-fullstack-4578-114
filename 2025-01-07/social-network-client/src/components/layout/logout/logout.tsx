import React, { useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from '../../auth/Auth';

const LogoutPage = () => {
    const auth = useContext(AuthContext);

    useEffect(() => {
        // Call the logout function from context
        if (auth) {
            auth.logout();
        }

        // Delete the 'auth' cookie
        Cookies.remove('auth');

        // Redirect to the home page after a delay
        const timer = setTimeout(() => {
            window.location.href = '/';
        }, 3000);

        return () => clearTimeout(timer);
    }, [auth]);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 text-center">
            <div className="p-6 bg-white rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
                <p className="text-gray-700 mb-4">
                    Thanks for using our social media software. We hope to see you again soon!
                </p>
                <button
                    className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                        window.location.href = '/';
                    }}
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default LogoutPage;