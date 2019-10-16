import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Products extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1
  };
  componentDidMount() {
    this.loadProducts();
  }
  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo, page });
  };

  prevPage = () => {
    const { page, productInfo } = this.state;

    if (page == 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  };
  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page == productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };
  render() {
    const { products, page, productInfo } = this.state;
    return (
      <div className="cards-group">
        <div className="row">
          {products.map(product => (
            <div className="col-sm-12 col-md-6 col-lg-4">
              <div className="card-product" key={product._id}>
                <img src={product.thumbnail_url} alt="" width="180rem" />
                <div className="card-body">
                  <h5 className="card-title">{product.company}</h5>
                  <p className="card-description">{product.techs}</p>
                  <span>
                    {product.price ? `R$${product.price}/dia` : 'GRATUITO'}
                  </span>
                  <Link to={`/product/${product.id}`}>Acessar</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>
            Anterior
          </button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>
            Proximo
          </button>
        </div>
      </div>
    );
  }
}
/*
export default function Products() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/products', {
        headers: { user_id }
      });
      setSpots(response.data);
    }
    loadSpots();
  }, []);
  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header
              style={{ backgroundImage: `url(${spot.thumbnail_url})` }}
            ></header>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}*/
