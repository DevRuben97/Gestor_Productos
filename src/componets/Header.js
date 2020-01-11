import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const HeaderMenu= ({SinOut})=> {

    return (
      
        <nav class="navbar navbar-dark bg-primary">
            <div className="container">
                <Link to='/' className="navbar-brand">Gestor de Productos</Link>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to="/Products" className="nav-link" activeClassName="active">Productos</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default HeaderMenu;