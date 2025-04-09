"use client";
import { useState } from "react";
import { useChangeTheme } from "../hooks/useChangeTheme";

interface NavBarProps {
  ThemeList: string[];
}

const NavBar: React.FC<NavBarProps> = ({ ThemeList }) => {
  const [theme, setTheme] = useState("maga");
  useChangeTheme(theme);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleThemeChange = (selectTheme: string) => {
    setTheme(selectTheme);
  };

  return (
    <div className="navbar p-3 bg-base-100 shadow-sm grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
      <div className="text-center sm:text-left ml-4">
        <h1 className="text-3xl font-bold">
          The Donald Dashboard{" "}
          <span className="ml-5">{new Date().toLocaleDateString()}</span>
        </h1>
      </div>
      <div className="text-center sm:text-right">
        <ul className="menu menu-horizontal px-1 text-1xl">
          <li>
            <details>
              <summary className="btn btn-primary hover:text-base-content hover:bg-transparent active:text-base-content! active:bg-transparent!">
                Selected Theme: {capitalizeFirstLetter(theme) || "Maga"}
              </summary>
              <ul className="text-center w-full bg-primary p-2 z-1">
                {ThemeList.map((selectTheme, index) => (
                  <li
                    className={`pb-1 w-full text-primary-content hover:cursor-pointer mb-0.5 ${
                      theme === selectTheme ? "font-bold text-primary" : ""
                    }`}
                    onClick={() => handleThemeChange(selectTheme)}
                    key={index}
                  >
                    {capitalizeFirstLetter(selectTheme)}
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
