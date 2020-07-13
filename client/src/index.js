import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import AuthProvider from './Context/AuthContext'
// import registerServiceWorker from "./registerServiceWorker";

// ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();

ReactDOM.render(<AuthProvider><App /></AuthProvider>, document.getElementById('root'));