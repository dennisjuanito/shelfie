import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard.js';
import Header from './components/Header/Header.js';
import Form from './components/Form/Form.js';
import Product from './components/Product/Product.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Dashboard />
        <Form />
        <Product/>
      </div>
    );
  }
}

export default App;
