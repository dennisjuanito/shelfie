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
  constructor() {
    super();
    this.state = {
      inventory: [],
      currentProduct: {}
    };
    this.getInventory = this.getInventory.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
  }
  componentDidMount() {
    axios.get(`/api/inventory`).then(response => {
      this.setState({
        inventory: response.data
      });
    });
  }

  getInventory() {
    axios.get(`/api/inventory`).then(response => {
      this.setState({
        inventory: response.data
      });
    });
  }

  selectProduct(productToBeEdited) {
    this.setState({
      currentProduct: productToBeEdited
    });
  }

  render() {
    return (
      <div className="App">
        <Header />

        <Link to="/">Dashboard</Link>
        <Link to="/add">Add Inventory</Link>

        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
              <Dashboard
                inventory={this.state.inventory}
                getInventory={this.getInventory}
                selectProduct={this.selectProduct}
              />)
            }}
          />

          <Route
            path="/add"
            render={() => {
              return(
              <Form
                getInventory={this.getInventory}
                currentProduct={this.state.currentProduct}
              />)
            }}
          />


        </Switch>
      </div>
    );
  }
}

export default App;
