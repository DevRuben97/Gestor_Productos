import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Componets
import HeaderMenu from "./componets/Header";

import { Routes, Routeswithoutlogin } from "./Routes";
import { bool } from "yup";

import Auth from "./Context/AuthContext";
import UserInfo from './Context/UserContext';

function App() {
  const [islogged, setLogged] = useState(false);
  const [User,SetUser]= useState({});

  useEffect(() => {
    CheckInitial();
  }, []);

  function CheckInitial() {
    setLogged(localStorage.getItem("logged"));
  }
  function Loginout(){
    localStorage.setItem('logged','false');
    setLogged(false);
  }

  return (
    <Auth.Provider value={{ islogged, setLogged }}>
      <UserInfo.Provider value={{User,SetUser}}>
      <Router>
        {islogged ? <HeaderMenu LoginOut={Loginout} /> : null}
        <Switch>
          {islogged
            ? Routes.map((data, index) => (
                <Route
                  path={data.path}
                  exact={data.exact}
                  component={data.main}
                  key={index}
                />
              ))
            : Routeswithoutlogin.map((data, index) => (
                <Route
                  path={data.path}
                  exact={data.exact}
                  component={data.main}
                  key={index}
                />
              ))}
        </Switch>
      </Router>
      </UserInfo.Provider>
    </Auth.Provider>
  );
}

export default App;
