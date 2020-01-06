import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Componets
import HeaderMenu from '../componets/Header';

import {Routes, Routeswithoutlogin} from '../Routes';
import { bool } from 'yup';


function App() {


  const [islogged, setLogin]= useState(false);


  useEffect(()=>{
    CheckInitial();
  }, [])

  function CheckInitial(){

    setLogin(localStorage.getItem("logged"));

  }

  return (
    <Router>
      {islogged? <HeaderMenu/>: null}
      <Switch>
       {islogged? Routes.map((data,index)=>(
         <Route path={data.path} exact={data.exact} component={data.main} key= {index}/>
       )): Routeswithoutlogin.map((data,index)=>(
        <Route path={data.path} exact={data.exact} component={data.main} key={index}/>
       ))}
      </Switch>
    </Router>
  );
}

export default App;
