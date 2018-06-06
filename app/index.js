import React from "react";
import { render } from "react-dom";
import App from "./containers/App";
import { hot } from "react-hot-loader";

render(
  <App/>,
  document.getElementById("root")
);

export default hot(module)(App);