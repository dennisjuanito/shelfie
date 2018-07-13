import React, { Component } from "react";
import axios from "axios";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: 0,
      imgurl: "",
      currentProductId : null // dunno
    };
    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputPrice = this.handleInputPrice.bind(this);
    this.handleInputImg = this.handleInputImg.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

//   componentDidUpdate(prevProps, prevState) {
//     //   console.log(prevProps,);
//     //   console.log(this.props);

//       if (prevProps.currentProduct.id !== this.props.currentProduct.id) {
//         this.setState({
//             name: this.props.currentProduct.name,
//             price: this.props.currentProduct.price,
//             imgUrl: this.props.currentProduct.img,
//             currentProductId: this.props.id
//         });
//       }
//   }
  handleInputName(val) {
    this.setState({
      name: val
    });
  }

  handleInputPrice(val) {
    this.setState({
      price: val
    });
  }

  handleInputImg(val) {
    this.setState({
      imgurl: val
    });
  }

  handleReset() {
    this.setState({
      name: "",
      price: 0,
      imgurl: "",
      currentProductId : null
    });
  }

  createProduct() {
      let {name, price, imgurl} = this.state;
    let productToAdd = {
        name: name,
        price: price,
        img: imgurl
    }
    axios.post(`/api/product`, productToAdd);
    this.props.getInventory();
    this.handleReset();

  }

  render() {
    return (
      <div>
        Form
        <input
          type="text"
          value={this.state.name}
          onChange={e => this.handleInputName(e.target.value)}
        />
        <input
          type="text"
          value={this.state.price}
          onChange={e => this.handleInputPrice(e.target.value)}
        />
        <input
          type="text"
          value={this.state.imgurl}
          onChange={e => this.handleInputImg(e.target.value)}
        />
        <button onClick={() => this.handleReset()}>Cancel</button>
        {
            (this.state.currentProductId) ? <button>Save Changes</button> : <button onClick={() => this.createProduct()}>Add to Inventory</button>
        }
       
      </div>
    );
  }
}
