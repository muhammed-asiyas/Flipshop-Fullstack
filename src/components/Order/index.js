import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../api/orderApi";
import "./index.css";

export default function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getOrderById(id);
        setOrder(res);
      } catch (err) {
        console.error("ORDER ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <div className="order-loading">Loading Order...</div>;
  if (!order) return <div className="order-error">Order Not Found</div>;

  return (
    <div className="order-page">
      <div className="order-container">
        <h1 className="order-title">🧾 Order Summary</h1>

        {/* Order Basic Info */}
        <div className="order-info-card">
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Email:</strong> {order.shippingAddress?.email || "No email provided"}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>

          <p>
            <strong>Status:</strong>
            <span className={order.isPaid ? "paid" : "pending"}>
              {order.isPaid ? "Paid" : "Pending"}
            </span>
          </p>
        </div>

        {/* Shipping Address */}
        <div className="order-info-card">
          <h2>Shipping Address</h2>
          <p>{order.shippingAddress?.fullName}</p>
          <p>{order.shippingAddress?.address}</p>
          <p>{order.shippingAddress?.phone}</p>
          <p>{order.shippingAddress?.city}</p>
          <p>{order.shippingAddress?.postalCode}</p>
          <p>{order.shippingAddress?.country}</p>
        </div>

        {/* Order Items */}
        <div className="order-items-box">
          <h2>Items Ordered</h2>

          {order.items.length === 0 && <p>No items found.</p>}

          {order.items.map((item, i) => (
            <div key={i} className="order-item">
              <div className="order-item-details">
                <h3>{item.name}</h3>
                {item.size && <p>Size: {item.size}</p>}
                {item.color && <p>Color: {item.color}</p>}
                <p>Qty: {item.qty}</p>
              </div>

              <div className="order-item-price">
                ₹{(item.qty * item.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="order-summary">
          <h2>Price Summary</h2>

          <p className="summary-row">
            <span>Items Price:</span>
            <strong>₹{(order.itemsPrice ?? 0).toFixed(2)
}</strong>
          </p>

          <p className="summary-row">
            <span>Shipping:</span>
            <strong>₹{(order.shippingPrice ?? 0).toFixed(2)}</strong>
          </p>

          <p className="summary-total">
            <span>Total:</span>
            <strong>₹{(order.totalPrice ?? 0).toFixed(2)}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}