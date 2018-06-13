import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Login from "components/Login";
import Home from "components/Home";
import { Grid } from "react-bootstrap";
import * as authActions from "actions/AuthActions";

class App extends Component {
  render () {
    let { isAuthenticated } = this.props.auth;
    const { login } = this.props.authActions;
    console.log(isAuthenticated);
    return <Grid>
      {isAuthenticated ? <Home/> : <Login login={login}/>}
    </Grid>;
  }
}

function mapStateToProps (state) {
  return state;
}


function mapDispatchToProps (dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);