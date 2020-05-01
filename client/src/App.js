import React from "react";
import LoginScreen from "./LoginScreen/LoginScreen";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Business from "./Business/Business";
import decoder from "jwt-decode";
import { connect } from "react-redux";
import { HIDE_DROP_DOWN } from "./actions/actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  render() {
    let token = false;
    let employeeToken = false;
    let adminToken = false;

    if (localStorage.getItem("token")) {
      token = decoder(localStorage.getItem("token"));
    } 


    return (
      <React.Fragment>
      <Switch>
       
        
        <Route
          path="/schedule"
          exact
          component={Business}
        />
        <Route
        path="/"
        exact
        component={LoginScreen}
        />
        {token.user && (
          <Redirect
            from="*"
            to={
              localStorage.getItem("token") !== null
                ? `/schedule`
                : `/`
            }
          />
        )}
      </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    employee: state.authReducer.employee,
    admin: state.authReducer.admin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideDropDown: () => dispatch({type: HIDE_DROP_DOWN }) 
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
