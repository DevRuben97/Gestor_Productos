import React from 'react';
import { NavLink, Link } from "react-router-dom";


export default function DropDownMenu({Show, Links}){

    return (
        <div class="dropdown-menu" style={{display: Show? 'block': 'none'}} aria-labelledby="dropdownMenuButton">
          {Links.map((item,index)=>(
              <NavLink class="dropdown-item" to={item.to}>
              <i className={item.icon}></i> {item.title}
            </NavLink>
              ))}
          </div>
    )
}
