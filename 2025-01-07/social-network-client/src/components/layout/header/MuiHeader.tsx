import React from "react";
import { NavLink } from "react-router-dom";

interface Link {
  path: string;
  name: string;
  type: "menu" | "settings";
}

interface ResponsiveAppBarProps {
  links: Link[];
}

export const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ links }) => {
  const menuLinks = links.filter((link) => link.type === "menu");
  const settingsLinks = links.filter((link) => link.type === "settings");

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
          <div className="md:hidden">
            {/* Mobile menu */}
            <button className="text-white">Menu</button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {settingsLinks.map((link) => (
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
          </div>
        </div>
      </div>
    </header>
  );
};
