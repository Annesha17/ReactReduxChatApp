/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();*/
import React from "react";
import ReactDOM from "react-dom";
// Readers: To prepare this project for building along in `./App.js`:
// [1] Comment out this line:
import App from './App1';
// [2] Un-comment this line:
// import App from "./App";

import "./index.css";

import "./semantic-dist/semantic.min.css";

ReactDOM.render(<App />, document.getElementById("root"));
