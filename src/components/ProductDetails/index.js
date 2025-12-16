import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart as addToApiCart } from "../../api/cartApi";
import Footer from "../Footer";
import "./index.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('S');

  useEffect(() => {
    fetch(`https://flipshop-backend.onrender.com/api/products/${id}`)
      .then((r) => r.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  const addToCart = async () => {
  try {
    await addToApiCart(id, Number(qty), size);
    alert("Added to Cart!");
  } catch (err) {
    console.error(err);
    alert("Failed to add to cart");
  }
};


  if (!product) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="product-details-wrapper">
      <div className="product-details-card">
        <img className="details-image" src={product.imageUrl} alt={product.name} />

        <div className="details-info">
          <h2 className="details-title">{product.name}</h2>
          <p className="details-description">{product.description}</p>
          <p className="details-price">₹{product.price}</p>
          <select className="qty-input" onChange={(e) => setSize(e.target.value)}>
            {product.sizes.map(each => (
              <option value={each}>{each}</option>
            ))}
          </select>

          <div className="details-controls">
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="qty-input"
            />
            <button className="add-btn" onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
    
  );
}