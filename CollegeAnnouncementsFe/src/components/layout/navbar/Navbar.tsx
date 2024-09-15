import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { appRoutes } from "@navigation";
import { useAppDispatch, useAppSelector } from "@store";
import { authActions } from "@reducers";

import style from "./Navbar.module.scss";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(({ auth }) => auth.currentUser);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const logOut = () => {
    dispatch(authActions.setCurrentUser(null));
    navigate("/login");
  };

  return (
    <nav className="navbar-top">
      <Link
        to={appRoutes.home.path}
        className="navbar-top-logo"
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <img src="/assets/logo.png" alt="ФТН" style={{ width: "70px" }} />
      </Link>

      <ul className="navbar-top-menu">
        <li className="navbar-top-dropdown">
          <button type="button" className="navbar-top-dropdown_toggle" onClick={toggleDropdown}>
            {user?.email || "user"}
          </button>
          {isDropdownOpen && (
            <ul className="navbar-top-dropdown_menu">
              <li>
                <button type="button" onClick={() => logOut()}>
                  <FiLogOut className={style.logoutIcon} /> Odjava
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
