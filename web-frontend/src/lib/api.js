const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'content-type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed.' }));
    throw new Error(error.error || 'Request failed.');
  }

  return response.json();
};

export const createOrder = order => request('/orders', {
  method: 'POST',
  body: JSON.stringify(order),
});

export const listOrders = () => request('/orders');

export const updateOrderStatus = (orderId, status) => request(`/orders/${orderId}/status`, {
  method: 'PATCH',
  body: JSON.stringify({ status }),
});

export const register = credentials => request('/auth/register', {
  method: 'POST',
  body: JSON.stringify(credentials),
});

export const login = credentials => request('/auth/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
});
