import "index.scss";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "containers/App";
import { hot } from "react-hot-loader";
import configureStore from "store/configureStore";
import { BrowserRouter as Router, Route } from "react-router-dom";

const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </Provider>,
  document.getElementById("root")
);

export default hot(module)(App);