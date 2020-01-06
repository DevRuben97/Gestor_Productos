import React from 'react';

//Viwes
import Dashboard from './views/Dashboard';
import Products from './views/Products';
import Login from './views/Login';


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
    }
]

export const Routeswithoutlogin= [
    {
        path: '/',
        exact: true,
        main: ()=> <Login/>
    }
]