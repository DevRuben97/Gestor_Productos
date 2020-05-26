import React from 'react';

//Viwes
import Dashboard from './views/Dashboard';
import Products from './views/Products';
import Login from './views/Login';
import UserProfile from './views/UserProfile';
import ProductMovements from './views/ProductMovements'
import FrmMovement from './views/FrmMovement';
import NoMatch from './views/404';

export const Routes= [
    {
        path: '/',
        exact: true,
        main: ()=> <Dashboard/>
    },
    {
        path: '/Products',
        exact: false,
        main: ()=> <Products/>
    },
    {
        path: '/UserProfile',
        exact: false,
        main: ()=> <UserProfile/>
    },
    {
        path: '/ProductMovements',
        exact: false,
        main: ()=> <ProductMovements/>
    },
    {
        path: '/AddMovement',
        exact: false,
        main: ()=> <FrmMovement/>
    },
    {
        path: '*',
        exact: false,
        main: ()=> <NoMatch/>
    }
]

export const Routeswithoutlogin= [
    {
        path: '/',
        exact: true,
        main: ()=> <Login/>
    }
]