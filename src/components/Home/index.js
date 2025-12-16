import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import './index.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`https://flipshop-backend.onrender.com/api/products?search=${encodeURIComponent(search)}`)
      .then(r => r.json())
      .then(data => setProducts(data.products || data || []))
      .catch(console.error);
  }, [search]);

  return (
    <>
      <div className="home-container">
      <h2 className="page-title">Products</h2>

      <input 
        className="search-box"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="product-grid">
        {products.map(p => (
          <div className="product-card" key={p._id}>
            <img src={p.imageUrl} alt="" />

            <Link to={`/products/${p._id}`} style={{ textDecoration: "none" }}>
              <h4>{p.name}</h4>
            </Link>

            <p className="product-price">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}