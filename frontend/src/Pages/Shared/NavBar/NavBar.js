import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Contexts/AuthProvider";
import logo from "../../../Assets/images/tb-logo.jpg";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.info("successfully logged out");
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        toast.error("something went wrong");
      });
  };

  return (
    <section className="sticky top-0 z-50">
      <div className="navbar bg-black lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            {/* Main Hamburger */}
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black text-white rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li tabIndex={0}>
                <Link className="justify-between">Categories</Link>
                <ul className="p-2 bg-gray-800 rounded">
                  <li>
                    <Link to="/category/pick-up">pickup/van </Link>
                  </li>
                  <li>
                    <Link to="/category/trucks&cover-van">trucks </Link>
                  </li>
                  <li>
                    <Link to="/category/trailer-truck">trailor </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>

              {user && user?.uid ? (
                <>
                  <li>
                    <Link to="/dashboard">DashBoard</Link>
                  </li>
                  <li tabIndex={1}>
                    <Link className="justify-between">
                      <div className="w-10 rounded-full">
                        <img
                          className="rounded-2xl"
                          title={user?.displayName}
                          src={user?.photoURL}
                          alt="img-1"
                        />
                      </div>
                    </Link>
                    <ul className="p-2 bg-gray-800 rounded">
                      <li>
                        <Link>Profile</Link>
                      </li>
                      <li>
                        <Link>My Products</Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}

              {user && user?.uid ? (
                <li onClick={handleLogOut}>
                  <p className="btn bg-orange-400 hover:bg-orange-500 border-none text-white">
                    Logout
                  </p>
                </li>
              ) : (
                <Link to="/register">
                  <li>
                    <p className="btn bg-orange-400 hover:bg-orange-500 border-none text-white">
                      Register
                    </p>
                  </li>
                </Link>
              )}
            </ul>
          </div>

          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              <img className="w-10 lg:w-16 rounded-md" src={logo} alt="" />
            </Link>
            <Link to="/">
              <p className="text-white text-xl lg:text-3xl font-bold ml-3">
                <i>
                  <span className="text-orange-500">Truck</span>Bazar
                </i>
              </p>
            </Link>
          </div>
        </div>

        <div className="navbar-end hidden lg:flex text-white">
          <ul className="menu menu-horizontal p-0">
            <li className="hover:text-orange-500">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-orange-500" tabIndex={0}>
              <Link>Categories</Link>
              <ul className="p-2 bg-gray-800 rounded">
                <li className="hover:text-orange-500">
                  <Link to="/category/pick-up">Pick-Up/Van</Link>
                </li>
                <li className="hover:text-orange-500">
                  <Link to="/category/trucks&cover-van">Trucks</Link>
                </li>
                <li className="hover:text-orange-500">
                  <Link to="/category/trailer-truck">Trailor</Link>
                </li>
              </ul>
            </li>
            <li className="hover:text-orange-500">
              <Link to="/blog">Blog</Link>
            </li>

            {user && user?.uid ? (
              <li className="hover:text-orange-500">
                <Link to="/dashboard">Dashboard</Link>
              </li>
            ) : (
              <li className="hover:text-orange-500">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>

          {user && user?.uid && (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar text-white"
              >
                <div className="w-10 rounded-full">
                  <img
                    title={user?.displayName}
                    src={user?.photoURL}
                    alt="img-1"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black text-white rounded-box w-52"
              >
                <li className="hover:text-orange-500">
                  <Link>Profile</Link>
                </li>
                <li className="hover:text-orange-500">
                  <Link>My Products</Link>
                </li>
              </ul>
            </div>
          )}

          {user && user?.uid ? (
            <div
              onClick={handleLogOut}
              className="btn bg-orange-400 hover:bg-orange-500 text-white"
            >
              <p>Logout</p>
            </div>
          ) : (
            <Link to="/register">
              <div className="btn bg-orange-400 hover:bg-orange-500 text-white">
                Register
              </div>
            </Link>
          )}
        </div>

        {/* Dashboard Hamburger (only when logged in & on dashboard) */}
        {user &&
          user?.uid &&
          window.location.pathname.includes("dashboard") && (
            <label
              tabIndex={2}
              htmlFor="dashboard-drawer"
              className="navbar-end text-white btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          )}
      </div>
    </section>
  );
};

export default NavBar;
