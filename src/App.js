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
      console.log(response.data);
    });
    console.log(this.state);
  }

  getInventory() {
    axios.get(`/api/inventory`).then(response => {
      this.setState({
        inventory: response.data
      });
    });
    console.log(this.state);
  }

  selectProduct(productToBeEdited) {
    this.setState({
      currentProduct: productToBeEdited
    });

    console.log(productToBeEdited);
    console.log(this.state);
  }

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
                  inventory={this.state.inventory}
                  getInventory={this.getInventory}
                  selectProduct={this.selectProduct}
                />
              )}
            />

            {console.log(this.state.currentProduct)}
           

            <Route
              path="/edit/:id"
              render={(historyProps) => {
                return (<Form
                  getInventory={this.getInventory}
                  currentProduct={this.state.currentProduct}
                  {...historyProps}
                />)
              }}
            />

             <Route
              path="/add"
              render={(historyProps) => (
                <Form
                  getInventory={this.getInventory}
                  currentProduct={this.state.currentProduct}
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
