import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../../services/auth";
import { AuthContext } from "../../auth/Auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const { newLogin } = useContext(AuthContext)!;

  const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    getJwt(username, password);
  };
  async function getJwt(username, password) {
    try {
      const userJwt = await auth.login({ username, password });
      newLogin(userJwt)!;
      console.log(userJwt);
      document.cookie = `auth=${userJwt}; path=/; secure; SameSite=Strict`;
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              defaultValue={"bob000"}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              defaultValue={"123456"}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
          <div className="flex justify-between items-center text-sm">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
            <a href="#" className="text-blue-500 hover:underline">
              Don't have an account? Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
