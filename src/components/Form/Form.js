import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      imgurl: "",
      currentProductId: null // dunno
    };
    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputPrice = this.handleInputPrice.bind(this);
    this.handleInputImg = this.handleInputImg.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.getProduct = this.getProduct.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevProps);
  //   console.log(this.props);
  //   // console.log(prevProps.currentProduct.id);
  //   // console.log(this.props.match.params.id);

  //   if (+prevProps.currentProduct.id !== +this.props.currentProduct.id) {
  //     this.setState({
  //       name: this.props.currentProduct.name,
  //       price: this.props.currentProduct.price,
  //       imgurl: this.props.currentProduct.img,
  //       currentProductId: this.props.currentProduct.id
  //     });
  //   }

  // }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    console.log(this.Props);
    if (prevProps !== this.props) {
      this.handleReset();
    }
  }

  getProduct(id) {
    axios.get(`/api/inventory/${id}`).then(response => {
      this.handleInputName(response.data[0].name);
      this.handleInputPrice(response.data[0].price);
      this.handleInputImg(response.data[0].img);
      this.setState({
        currentProductId: response.data[0].id
      });
    });
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id);
  }

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
      currentProductId: null
    });
  }

  createProduct() {
    let { name, price, imgurl } = this.state;
    let productToAdd = {
      name: name,
      price: price,
      img: imgurl
    };
    axios.post(`/api/product`, productToAdd);
    // this.props.getInventory();
    this.handleReset();
  }

  updateProduct() {
    let updatedProduct = {
      name: this.state.name,
      price: this.state.price,
      img: this.state.imgurl
    };
    axios.put(`/api/inventory/${this.state.currentProductId}`, updatedProduct);
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
        {this.state.currentProductId ? (
          <Link to="/">
            <button onClick={() => this.updateProduct()}>Save Changes</button>
          </Link>
        ) : (
          <button onClick={() => this.createProduct()}>Add to Inventory</button>
        )}
      </div>
    );
  }
}
