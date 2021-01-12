import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Main() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/spots');
      setProducts(response.data);
    }
    loadProducts();
  }, []);
  return (
    <>
      <h1>Oi Kevin</h1>

      <div className="row">
        <div className="li-float col-sm-12 col-md-8 col-lg-4">
          <ul>
            <li>sei la</li>
            <li>tamo ai</li>
            <li>testando</li>
            <li>opa</li>
            <li>[e ossp</li>
          </ul>
        </div>
        <div className="cards-float col-sm-12 col-md-8 col-lg-4">
          <div className="row">
            {products.map(product => (
              <div className="col-sm-12 col-md-6 col-lg-4" key={product._id}>
                <div className="cards-product">
                  <img src={product.thumbnail_url} alt="" width="180rem" />
                  <div className="cards-body">
                    <h5 className="cards-title">{product.company}</h5>
                    <p className="cards-description">{product.techs}</p>
                    <span>
                      {product.price ? `R$${product.price}/dia` : 'GRATUITO'}
                    </span>
                    <Link to={`/product/${product.id}`}>Acessar</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/new">
            <button className="btn">Cadastrar novo spot</button>
          </Link>
        </div>
      </div>
    </>
  );
}

/*
export default class Main extends Component {
  state = {
    products: []
  };
  componentDidMount() {
    this.loadProducts();
  }
  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo, page });
  };
  render() {
    const { products } = this.state;
    return (
      <div>
        <h1>pagina home</h1>
      </div>
    );
  }
}*/
