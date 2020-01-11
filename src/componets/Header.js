import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserInfo from '../Context/UserContext';

const HeaderMenu = ({ LoginOut }) => {


    const {User}= useContext(UserInfo);
    console.log(User);

    
  return (
    <nav class="navbar navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Gestor de Productos
        </Link>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              to="/Products"
              className="nav-link"
              activeClassName="active"
            >
              Productos
            </NavLink>
          </li>
        </ul>
        <span class="navbar-text">Hola, {User.UserName}</span>
      </div>
    </nav>
  );
};

export default HeaderMenu;
