import React, { Component } from "react";
import Product from "../Product/Product";
import axios from "axios";
import {Link} from 'react-router-dom';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.removeProduct = this.removeProduct.bind(this);
  }

  removeProduct(id) {
      axios.delete(`/api/inventory/${id}`)
      this.props.getInventory();
  }

 
  render() {
    let displayInventory = ()  =>  {
      return this.props.inventory.map(product => {
        let productImage = (product.img) ? product.img : "https://png.icons8.com/ios/1600/no-camera.png";
        return (
          <div key={product.id}>
            <Product
              name={product.name}
              price={product.price}
              img={productImage}
            />
            <button onClick={() => this.removeProduct(product.id)}>Delete</button>
            <Link to={`/edit/${product.id}`}><button onClick={() => this.props.selectProduct(product)}>Edit</button></Link>
          </div>
        );
      });
    };
    return (
      <div>
        <div>Dashboard</div>
        {displayInventory()}
      </div>
    );
  }
}
