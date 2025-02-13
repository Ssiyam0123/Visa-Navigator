import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ThemeContext } from "../provider/ThemeProvider"; // Import ThemeContext
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, handleSignOut } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    handleSignOut().then(() => {
      toast.success("logout successfull");
    });
  };

  const handleThemeChange = (e) => {
    // Update the theme based on the checkbox status
    if (e.target.checked) {
      setTheme("dark"); // Set dark theme
    } else {
      setTheme("light"); // Set light theme
    }
  };

  return (
    <div
      className={`navbar px-4 md:px-8 shadow-lg ${
        theme === "light" ? "bg-lightBg text-textDark" : "bg-darkBg text-white"
      }`}
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        <NavLink
          to="/"
          className="btn btn-ghost normal-case text-xl text-primary"
        >
          Visa Navigator
        </NavLink>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {[
            "/",
            "/all-visas",
            "/add-visa",
            "/my-added-visas",
            "/my-applications",
          ].map((route, index) => (
            <li key={index}>
              <NavLink
                to={route}
                className={({ isActive }) =>
                  `btn ${
                    isActive ? "bg-primary text-white border-none" : "btn-ghost"
                  }`
                }
              >
                {route === "/"
                  ? "Home"
                  : route.replace("/", "").replace("-", " ").toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-4">
        {/* Auth Buttons */}
        {!user ? (
          <>
            <NavLink
              to="/login"
              className="btn btn-outline btn-primary mx-1 border-primary text-primary"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-outline mx-1 border-secondary text-secondary"
            >
              Register
            </NavLink>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLogout}
              className="btn bg-error text-white hidden lg:block border-none"
              data-tooltip-id="logout-tooltip"
              data-tooltip-content="Click to logout"
            >
              Logout
            </button>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end z-50">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                data-tooltip-id="profile-tooltip"
                data-tooltip-content={user.displayName || "Profile"}
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt="Profile" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-lightBg rounded-box w-52 lg:hidden"
              >
                {[
                  "/",
                  "/all-visas",
                  "/add-visa",
                  "/my-added-visas",
                  "/my-applications",
                ].map((route, index) => (
                  <li key={index}>
                    <NavLink
                      to={route}
                      className={({ isActive }) =>
                        `btn ${
                          isActive
                            ? "bg-primary text-white border-none"
                            : "btn-ghost"
                        }`
                      }
                    >
                      {route === "/"
                        ? "Home"
                        : route
                            .replace("/", "")
                            .replace("-", " ")
                            .toUpperCase()}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn bg-error text-white border-none"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Theme Toggle Button */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={handleThemeChange}
            checked={theme === "dark"}
          />

          {/* Sun Icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* Moon Icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>

      {/* Tooltips */}
      <ReactTooltip
        id="logout-tooltip"
        place="bottom"
        effect="solid"
        className="z-50"
      />
      <ReactTooltip
        id="profile-tooltip"
        place="bottom"
        effect="solid"
        className="z-50"
      />
    </div>
  );
};

export default Navbar;
