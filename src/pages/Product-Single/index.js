import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Product extends Component {
  state = {
    product: {},
    productInfo: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const response = await api.get(`/product/${id}`);

    this.setState({ product: response.data });
  }

  render() {
    const { product, productInfo } = this.state;

    return (
      <div className="product-info">
        <h1>{product.company}</h1>
        <p>Tecnologia: {product.techs}</p>
        <span>
          Preço: {product.price ? `R$${product.price}/dia` : 'GRATUITO'}
        </span>

        <p>
          URL: <a href={product.thumbnail_url}>{product.thumbnail_url}</a>
        </p>
      </div>
    );
  }
}
