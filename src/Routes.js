import React from 'react';

//Viwes
import Dashboard from './views/Dashboard';
import Products from './views/Products';
import Login from './views/Login';
import UserProfile from './views/UserProfile';


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
    }
]

export const Routeswithoutlogin= [
    {
        path: '/',
        exact: true,
        main: ()=> <Login/>
    }
]