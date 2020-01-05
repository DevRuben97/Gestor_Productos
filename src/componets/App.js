import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Componets
import HeaderMenu from '../componets/Header';

//Views
import Dashboard from '../views/Dashboard';
import Products from '../views/Products';
import Login from '../views/Login';



function App() {
  return (
    <Router>
      <HeaderMenu></HeaderMenu>
      <main className="mt-5">
      <Switch>
        <Route path='/' exact component={Dashboard}></Route>
        <Route path='/Products' exact component={Products}></Route>
        <Route path='/Login' exact component={Login}></Route>
      </Switch>
      </main>
    </Router>
  );
}

export default App;
