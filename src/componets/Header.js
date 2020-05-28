import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserInfo from "../Context/UserContext";
import DropDownMenu from './Menu/DropDownMenu';
import MenuContainer from './Menu/MenuContainer';
import {UserMenuRoutes} from './Menu/MenuRoutes';

const HeaderMenu = ({ LoginOut }) => {
  const { User } = useContext(UserInfo);
  const [ShowUserMenu,SetUserMenu ]= useState(false);

  return (
    <nav class="navbar navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Gestor de Productos
        </Link>
        <MenuContainer/>
        <div class="dropdown">
          <button
            class="btn btn-link dropdown-toggle"
            type="button"
            style={{color: 'white'}}
            onClick= {()=> ShowUserMenu? SetUserMenu(false): SetUserMenu(true)}
          >
            Hola, {User.UserName}
          </button>
          <DropDownMenu
          Show= {ShowUserMenu}
          Links={UserMenuRoutes}
          Close={SetUserMenu}
          LoginOut={LoginOut}
          />
        </div>
      </div>
    </nav>
  );
};

export default HeaderMenu;
