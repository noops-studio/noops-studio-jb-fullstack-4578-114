// components/layout/routing/Routing.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Profile from "../../posts/profile/Profile";
import Feed from "../../posts/feed/Feed";
import LoginPage from "../login/login";
import LogoutPage from "../logout/logout";
import NotFound from "../not-found/NotFound";

export default function Routing(): JSX.Element {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />

      {/* Protected routes inside Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
