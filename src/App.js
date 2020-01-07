import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Componets
import HeaderMenu from "./componets/Header";

import { Routes, Routeswithoutlogin } from "./Routes";
import { bool } from "yup";

import Auth from "./lib/AuthContext";

function App() {
  const [islogged, setLogged] = useState(false);

  useEffect(() => {
    CheckInitial();
  }, []);

  function CheckInitial() {
    setLogged(localStorage.getItem("logged"));
  }

  return (
    <Auth.Provider value={{ islogged, setLogged }}>
      <Router>
        {islogged ? <HeaderMenu /> : null}
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
    </Auth.Provider>
  );
}

export default App;
