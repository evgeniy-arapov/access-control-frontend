import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";

import PropTypes from "prop-types";

export default class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: "altaderika@gmail.com",
      password: "12345678"
    };
  }

  login () {
    this.props.login(this.state);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render () {
    console.log(this.props);
    return (
      <form>
        <br/>
        <br/>
        <FormGroup>
          <FormControl
            type={"email"}
            value={this.state.email}
            name={"email"}
            placeholder={"Email"}
            onChange={::this.handleChange}
          />
          <br/>
          <FormControl
            type={"password"}
            value={this.state.password}
            name={"password"}
            placeholder={"Password"}
            onChange={::this.handleChange}
          />
          <br/>
          <Button onClick={::this.login}>Login</Button>
        </FormGroup>
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};
