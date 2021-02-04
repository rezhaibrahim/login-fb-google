import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import authAction from './redux/actions/auth';
import CheckList from './components/CheckList'
import { connect } from 'react-redux';
class App extends Component {
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      this.props.setToken(localStorage.getItem('token'));
    }
  }
  render() {
    return (
      <>

        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} exact/>
            <Route path="/register" component={Register} />
            <PrivateRoute >
              <CheckList />
            </PrivateRoute>

          </Switch>
        </BrowserRouter>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  
});
const mapDispatchToProps = {
  setToken: authAction.setToken,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
