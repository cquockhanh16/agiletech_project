import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../../Images/logo.png";
import banner from "./../../Images/banner.png";
import { CiMenuBurger } from "react-icons/ci";

import "./Header.css";
import { handleSessionExpired } from "../../../services/apiServices";

interface LoginProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<LoginProps> = ({ isAuthenticated, onLogout }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const logoutHandler = async () => {
    handleSessionExpired();
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };
  return (
    <nav>
      <div className='container'>
        <div className='nav'>
          <div>
            <Link to={"/"}>
              <img src={logo} alt='logo' />
            </Link>
          </div>
          {!isAuthenticated && (
            <button>
              <Link to={"/login"}>Sign in</Link>
            </button>
          )}
          {isAuthenticated && (
            <div className={`user-action`}>
              <div>
                <p onClick={() => setToggle((prev) => !prev)}>
                  <CiMenuBurger className='icon' />
                </p>
                <div
                  className={`${toggle ? "" : "is-hidden"} user-action-g`}
                  onClick={() => setToggle(false)}>
                  <button>
                    <Link to={"/profile"}>Profile</Link>
                  </button>
                  <button onClick={logoutHandler}>Logout</button>
                </div>
                {/* )} */}
              </div>
            </div>
          )}
        </div>
        <div className='banner'>
          <div className='banner_content'>
            <h1>Save your data storage here. </h1>
            <p>
              Data Warehouse is a data storage area that has been tested for
              security, so you can store your data here safely but not be afraid
              of being stolen by others.
            </p>
            <button>Learn more</button>
          </div>
          <div className='banner__img'>
            <img src={banner} alt='banner' />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
