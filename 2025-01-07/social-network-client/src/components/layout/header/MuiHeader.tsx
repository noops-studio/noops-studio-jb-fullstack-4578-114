import React, { useContext, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/Auth";
import { jwtDecode } from "jwt-decode";
import User from "../../../models/users/Users";

interface Link {
  path: string;
  name: string;
  type: "menu" | "settings";
}

interface ResponsiveAppBarProps {
  links: Link[];
  profilePicUrl: string;
  username: string;
}

export const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({
  links,
  profilePicUrl,
  username,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuLinks = links.filter((link) => link.type === "menu");
  const settingsLinks = links.filter((link) => link.type === "settings");

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">LOGO</span>
          <nav className="hidden md:flex space-x-4">
            {menuLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-white ${
                    isActive ? "underline font-semibold" : "hover:opacity-80"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="flex items-center space-x-2"
              onClick={toggleDropdown}
            >
              <img
                src={profilePicUrl}
                alt={`${username} profile`}
                className="w-8 h-8 rounded-full border"
              />
              <span>{username}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md">
                {settingsLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
