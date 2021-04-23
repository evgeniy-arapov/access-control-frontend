import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Login from "components/Login";
import Home from "components/Home";
import About from "components/About";
import { Grid } from "react-bootstrap";
import * as authActions from "actions/AuthActions";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

export class App extends Component {
  render () {
    let {isAuthenticated} = this.props;
    const {login} = this.props.authActions;
    const {pathname} = this.props.location;
    console.log(isAuthenticated);
    if(!isAuthenticated && pathname !== "/login") return <Redirect to="/login"/>;
    if(isAuthenticated && pathname === "/login") return <Redirect to="/"/>;

    return (
      <Grid>
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route path={"/about"} component={About}/>
          <Route path={"/login"} render={() => <Login login={login}/>}/>
        </Switch>
      </Grid>
    );
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps (dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
