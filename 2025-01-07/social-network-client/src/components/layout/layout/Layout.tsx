// components/layout/layout/Layout.tsx
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../auth/Auth";
import Followings from "../following/Following";
import Folowers from "../folowers/Folowers";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import LoginPage from "../login/login";

// Utility function to check if the user is authenticated


export default function Layout() {
  // Redirect to /login if the user is not authenticated
  // if (!isAuthenticated()) {
  //   return <Navigate to="/login" replace />;
  // }

  const {jwt} = useContext(AuthContext)!;
const isAuthenticated: boolean = !!jwt;


  return (
    <div>
      {!isAuthenticated && (
        <>
          <LoginPage />
        </>
      )}

      {isAuthenticated && (
        <>
          <div className="grid grid-rows-[auto_1fr_auto] grid-cols-[1fr_3fr] h-screen">
            <header className="col-span-2 row-start-1 bg-gray-100 border border-gray-300">
              <Header />
            </header>

            <aside className="col-start-1 row-start-2 bg-white border border-gray-300 p-4 h-full grid grid-rows-2 gap-4">
              <div className="overflow-y-auto">
                <Followings />
              </div>
              <div className="overflow-y-auto">
                <Folowers />
              </div>
            </aside>

            <main className="col-start-2 row-start-2 row-span-2 bg-gray-50 border border-gray-300 p-4">
              <div className="h-full overflow-y-auto">
                <Outlet />
              </div>
            </main>

            <footer className="col-span-2 row-start-4 bg-gray-800 h-5 text-white text-center py-4">
              <Footer />
            </footer>
          </div>
        </>
      )}
    </div>
  );
}
