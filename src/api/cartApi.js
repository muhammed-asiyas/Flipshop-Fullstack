import { getSessionId } from '../utils/session';

const API_BASE = 'https://flipshop-backend.onrender.com/api/cart';

async function apiFetch(path, opts = {}) {
  const sessionId = getSessionId();

  const headers = {
    "Content-Type": "application/json",
    "x-session-id": sessionId,
    ...(opts.headers || {})
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
    credentials: 'include'
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API Error");

  return data;
}

export const getCart = () => apiFetch("/", { method: "GET" });

export const addToCart = (productId, qty = 1, size) =>
  apiFetch("/add", {
    method: "POST",
    body: JSON.stringify({ productId, quantity: qty, size })
  });

export const updateQty = (itemId, qty) =>
  apiFetch(`/update/${itemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity: qty })
  });

export const removeItem = (itemId) =>
  apiFetch(`/remove/${itemId}`, { method: "DELETE" });

export const clearCart = () =>
  apiFetch("/clear", { method: "DELETE" });