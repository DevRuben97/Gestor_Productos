import React from "react";
import {Routes} from "./MenuRoutes";
import { NavLink } from "react-router-dom";

export default function MenuContainer(props) {
  return (
    <ul className="navbar-nav mr-auto MenuContainer">
      {Routes.map((item, index) => (
        <li className="nav-item">
          <NavLink
            to={item.to}
            className={item.className}
            activeClassName={item.activeClassName}
            key={index}
          >
            <i className={item.icon}></i> {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
