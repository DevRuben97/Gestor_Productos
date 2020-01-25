import React from 'react';
import { NavLink } from "react-router-dom";


export default function DropDownMenu({Show, Links, Close, LoginOut}){


    return (
        <div class="dropdown-menu" style={{display: Show? 'block': 'none'}} aria-labelledby="dropdownMenuButton">
          {Links.map((item,index)=>{
            if (item.to!== '/LoginOut'){
              return (
                (
                  <NavLink class="dropdown-item" to={item.to} onClick={()=> Close(false)}>
                  <i className={item.icon}></i> {item.title}
                </NavLink>
                  )
              )
            }
            else{
              return (
                <a
              onClick= {()=> LoginOut()}
              className= 'dropdown-item'
              >
                <i className={item.icon}></i> {item.title}
              </a>
              )
            }
          }
          
          
          )}
          </div>
    )
}
