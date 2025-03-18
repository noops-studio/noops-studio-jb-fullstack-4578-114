// components/common/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps): JSX.Element {
  const isAuthenticated = (): boolean => {
    // Check for 'auth' cookie or token logic
    return document.cookie.split("; ").some((cookie) => cookie.startsWith("auth="));
  };

  return isAuthenticated() ? element : <Navigate to="/login" replace />;
}
