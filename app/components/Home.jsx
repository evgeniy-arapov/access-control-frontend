import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render () {
    return (
      <div>
        <div id={"welcome"} className={"welcome"}>Добро пожаловать на главную страницу.</div>
        <Link to={"/about"}>About</Link>
      </div>
    );
  }
}
