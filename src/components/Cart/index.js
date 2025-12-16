import React, { useEffect, useState } from 'react';
import './index.css';
import { getCart, removeItem, updateQty, clearCart } from '../../api/cartApi';
import { createOrder } from '../../api/orderApi';
import CartItem from '../CartItem';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log(cart)

  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    email: "",
    city: "",
    postalCode: "",
    country: "India",
    phone: ""
  });

  const navigate = useNavigate();

  async function load() {
    try {
      setLoading(true);
      const res = await getCart();
      setCart(res);
    } catch (err) {
      console.error(err);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const handleRemove = async (id) => {
    await removeItem(id);
    load();
  };

  const handleUpdate = async (id, qty) => {
    await updateQty(id, qty);
    load();
  };

  const handleClear = async () => {
    if (!window.confirm("Remove ALL items from cart?")) return;
    await clearCart();
    load();
  };

    const handleClearCart = async () => {
    await clearCart();
    load();
  };

  // ➤ Step 1: Open popup
  const handleOrderNow = () => {
    setShowModal(true);
  };

  // ➤ Step 2: Confirm order from popup
  // In Cart.jsx confirmOrder

const confirmOrder = async () => {
  try {
    const orderData = {
      items: cart.items.map(i => ({
        product: i.product._id,
        qty: i.quantity,
        size: i.size,
      })),

      shippingAddress: {
        fullName: shipping.fullName,
        address: shipping.address,
        email: shipping.email,  // Important
        city: shipping.city,
        postalCode: shipping.postalCode,
        country: shipping.country,
        phone: shipping.phone
      },

      paymentMethod: "mock",
    };

    const order = await createOrder(orderData);

    setShowModal(false);
    navigate(`/order/${order._id}`);
    handleClearCart();
  } catch (err) {
    alert("Order failed: " + err.message);
  }
};


  if (loading) return <div className="loading-text">Loading...</div>;

  return (
    <>
      <div className="cart-page">
        <h1 className="cart-title">🛒 Your Shopping Cart</h1>

        <div className="cart-wrapper">
          {cart?.items?.length > 0 ? (
            <>
              <button className="cart-clear-btn" onClick={handleClear}>
                Remove All Items
              </button>

              <div className="cart-items-box">
                {cart.items.map(item => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onRemove={handleRemove}
                    onUpdateQty={handleUpdate}
                  />
                ))}
              </div>

              <div className="cart-summary">
                <h3 className="summary-label">
                  Subtotal:
                  <span className="summary-value">₹{(cart.subtotal || 0).toFixed(2)}</span>
                </h3>

                <h3 className="summary-label">
                  Discount:
                  <span className="summary-value discount">₹{(cart.discount || 0).toFixed(2)}</span>
                </h3>

                <h2 className="summary-total">
                  Grand Total:
                  <span>₹{(cart.grandTotal || 0).toFixed(2)}</span>
                </h2>

                {/* ORDER NOW BUTTON */}
                <button 
                  className="order-now-btn"
                  onClick={handleOrderNow}
                >
                  Order Now
                </button>
              </div>
            </>
          ) : (
            <div className="empty-cart-text">Your cart is empty 🛍️</div>
          )}
        </div>
      </div>

      {/* POPUP MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Shipping Address</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={shipping.fullName}
              onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
            />

            <input
              type="text"
              placeholder="Address"
              value={shipping.address}
              onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
            />

            <input
              type="text"
              placeholder="Email"
              value={shipping.email}
              onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
            />

            <input
              type="text"
              placeholder="City"
              value={shipping.city}
              onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
            />

            <input
              type="text"
              placeholder="Postal Code"
              value={shipping.postalCode}
              onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
            />

            <input
              type="text"
              placeholder="Country"
              value={shipping.country}
              onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={shipping.phone}
              onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
            />

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={confirmOrder} >Confirm Order</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}