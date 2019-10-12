import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Audience from "./Audience";
import IncomingRequests from "./IncomingRequests";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Route exact path="/" component={Audience} />
            <Route exact path="/incomingrequests" component={IncomingRequests} />
            <Route path="*" component={Audience} />
          </div>
        </Router>
    );
  }
}
export default App;
