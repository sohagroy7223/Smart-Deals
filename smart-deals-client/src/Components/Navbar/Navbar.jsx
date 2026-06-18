import { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();

  const link = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? "mr-4 font-bold text-blue-500 underline" : "mr-4"
        }
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? "mr-4 font-bold text-blue-500 underline" : "mr-4"
        }
        to="/allProducts"
      >
        All Products
      </NavLink>

      {user && (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive ? "mr-4 font-bold text-blue-500 underline" : "mr-4"
            }
            to="/myProducts"
          >
            My Products
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "mr-4 font-bold text-blue-500 underline" : "mr-4"
            }
            to="/myBids"
          >
            My Bids
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "mr-4 font-bold text-blue-500 underline" : "mr-4"
            }
            to="/createProduct"
          >
            Create Products
          </NavLink>
        </>
      )}
    </>
  );

  const handelLogOut = () => {
    logOut()
      .then(() => {
        // console.log(result);
        alert("Sign-out successful.");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <a className="btn-ghost text-lg font-bold">
          Smart<span className="text-primary">Deals</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>
      <div className="navbar-end flex gap-3">
        {user && (
          <img className="rounded-full w-12 h-14" src={user?.photoURL} alt="" />
        )}
        {user ? (
          <button onClick={handelLogOut} className="btn btn-primary text-white">
            Sign out
          </button>
        ) : (
          <button className="btn btn-primary text-white">
            <Link to="/login">Sign In</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
