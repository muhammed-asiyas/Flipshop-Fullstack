import React, { useState } from 'react';
import './index.css';

export default function CartItem({ item, onRemove, onUpdateQty }) {
  const [qty, setQty] = useState(item.quantity);


  const changeQty = async (next) => {
    if (next < 1) return;
    setQty(next);
    await onUpdateQty(item._id, next);  // FIXED ID
  };

  return (
    <div className="cart-item">
      <img src={item.product.imageUrl} alt={item.product.name} />

      <div className="cart-item-details">
        <strong>{item.product.name}</strong>

        {item.size && <div>Size: {item.size}</div>}
        {item.color && <div>Color: {item.color}</div>}

        <div>Price: ₹{item.product.price}</div>
        <div>Line: ₹{(qty * item.product.price).toFixed(2)}</div>

      </div>

      <div className="cart-item-actions">
        <div className="qty-controls">
          <button className="qty-btn" onClick={() => changeQty(qty - 1)}>-</button>
          <span className="qty-number">{qty}</span>
          <button className="qty-btn" onClick={() => changeQty(qty + 1)}>+</button>
        </div>

        <button className="remove-btn" onClick={() => onRemove(item._id)}>
          Remove
        </button>
      </div>
    </div>
  );
}