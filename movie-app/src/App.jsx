import React, { Component } from "react";
import Movies from "./components/movies";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/common/header";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import MovieContent from "./components/movieContent";
import NotFound from "./components/common/notfound";
import LoginForm from "./components/loginForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieContent} />
            <Route path="/movies" component={Movies} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customers} />
            <Route path="/login" component={LoginForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
