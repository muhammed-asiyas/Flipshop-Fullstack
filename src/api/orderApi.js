// frontend/src/api/orderApi.js
import { getSessionId } from '../utils/session';

const API_BASE = 'https://flipshop-backend.onrender.com/api/orders';

async function apiFetch(path, opts = {}) {
  const sessionId = getSessionId();

  const headers = {
    'Content-Type': 'application/json',
    'x-session-id': sessionId,
    ...(opts.headers || {})
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
    credentials: 'include'
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Order API Error');
  return json;
}

/** Create new order */
export const createOrder = (orderData) =>
  apiFetch('/', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });

/** Get order by ID (protected route) */
export const getOrderById = (orderId) =>
  apiFetch(`/${orderId}`, {
    method: 'GET'
  });