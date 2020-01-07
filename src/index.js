import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import './assets/styles/bootstrap.min.css';
import './assets/styles/General.css';
import '@fortawesome/fontawesome-free/js/all'
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
