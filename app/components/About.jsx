import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render () {
    return (
      <div>
        <div className={"about"}>Добро пожаловать на страницу описания.</div>
        <Link to={"/"}>Home</Link>
      </div>
    );
  }
}
