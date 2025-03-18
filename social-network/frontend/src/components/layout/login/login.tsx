import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import auth from "../../../services/auth";
import { AuthContext } from "../../auth/Auth";

export default function LoginPage() {
  enum AuthType {
    Login = "login",
    Signup = "signup",
  }

  const navigate = useNavigate();
  const { newLogin } = useContext(AuthContext)!;

  const [authType, setAuthType] = useState<AuthType>(AuthType.Login);
  const [error, setError] = useState<string | null>(null);
  const [passwordFeedback, setPasswordFeedback] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showValidationToast, setShowValidationToast] = useState(false);
  const [isToastDragged, setIsToastDragged] = useState(false);

  const toastRef = useRef<HTMLDivElement | null>(null);

  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z ]{6,}$/;
    return nameRegex.test(name);
  };

  const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password: string): boolean => {
    const length = password.length >= 6;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /\d/.test(password);
    const specialChar = /[!@#$%^&*]/.test(password);

    setPasswordFeedback({ length, uppercase, lowercase, number, specialChar });
    return length && uppercase && lowercase && number && specialChar;
  };

  const handleDragStart = (e: React.MouseEvent) => {
    const toast = toastRef.current;
    if (!toast) return;

    const shiftX = e.clientX - toast.getBoundingClientRect().left;
    const shiftY = e.clientY - toast.getBoundingClientRect().top;

    const onMouseMove = (event: MouseEvent) => {
      toast.style.left = `${event.clientX - shiftX}px`;
      toast.style.top = `${event.clientY - shiftY}px`;
    };

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );

    setIsToastDragged(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username") as string;
    const password = data.get("password") as string;

    try {
      let jwt: string;
      
      if (authType === AuthType.Signup) {
        const name = data.get("name") as string;
        if (!name) {
          setError("Name is required");
          return;
        }
        
        const nameValid = validateName(name);
        const usernameValid = validateUsername(username);
        const passwordValid = validatePassword(password);

        if (!nameValid || !usernameValid || !passwordValid) {
          setShowValidationToast(true);
          setError("Some fields do not meet the requirements.");
          return;
        }

        jwt = await auth.signup({ username, password, name });
      } else {
        jwt = await auth.login({ username, password });
      }

      newLogin(jwt);
      document.cookie = `auth=${jwt}; path=/; secure; SameSite=Strict`;
      navigate("/");
    } catch (err) {
      console.error("Authentication failed:", err);
      setError("Authentication failed. Please try again.");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {authType === AuthType.Login ? "Sign In" : "Sign Up"}
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authType === AuthType.Signup && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                onChange={(e) => validatePassword(e.target.value)}
                onFocus={() => authType === AuthType.Signup && setShowValidationToast(true)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-500 hover:text-gray-700"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {authType === AuthType.Login ? "Sign In" : "Sign Up"}
          </button>
          <div className="flex justify-between items-center text-sm mt-4">
            <button
              type="button"
              onClick={() =>
                setAuthType(authType === AuthType.Login ? AuthType.Signup : AuthType.Login)
              }
              className="text-blue-500 hover:underline"
            >
              {authType === AuthType.Login
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </form>
      </div>

      {authType === AuthType.Signup && showValidationToast && (
        <div
          ref={toastRef}
          className={`absolute top-4 right-4 bg-white shadow-lg rounded-md p-4 border ${
            isToastDragged ? "cursor-move" : "cursor-pointer"
          }`}
          onMouseDown={handleDragStart}
        >
          <h2 className="text-lg font-semibold text-gray-700">Validation Requirements</h2>
          <ul className="mt-2 text-sm text-gray-600">
            <li className={passwordFeedback.length ? "text-green-500" : "text-red-500"}>
              At least 6 characters
            </li>
            <li className={passwordFeedback.uppercase ? "text-green-500" : "text-red-500"}>
              At least one uppercase letter
            </li>
            <li className={passwordFeedback.lowercase ? "text-green-500" : "text-red-500"}>
              At least one lowercase letter
            </li>
            <li className={passwordFeedback.number ? "text-green-500" : "text-red-500"}>
              At least one number
            </li>
            <li className={passwordFeedback.specialChar ? "text-green-500" : "text-red-500"}>
              At least one special character (!@#$%^&*)
            </li>
          </ul>
          <button
            onClick={() => setShowValidationToast(false)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
