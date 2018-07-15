import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Header from "./components/Header/Header.js";
import Form from "./components/Form/Form.js";
import Product from "./components/Product/Product.js";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from "./routes.js";
import axios from "axios";

class App extends Component {



  render() {
    return (
      <div className="App">
        <Header />
        <Link to="/">Dashboard</Link>
        <Link to="/add">Add Inventory</Link>

        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Dashboard
                />
              )}
            />
           
            <Route
              path="/edit/:id"
              render={(historyProps) => {
                return (<Form
                  {...historyProps}
                />)
              }}
            />

             <Route
              path="/add"
              render={(historyProps) => (
                <Form
                  {...historyProps}
                />
              )}
            />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
