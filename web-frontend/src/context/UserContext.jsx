import { createContext, useContext, useState, useEffect } from 'react';
import { updateOrderStatus as updateOrderStatusApi } from '../lib/api';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('gravity_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem('gravity_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('gravity_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('gravity_orders', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const addOrder = (order) => {
    const savedOrder = { ...order, id: order.id || Date.now(), date: order.date || order.createdAt || new Date().toISOString() };
    setOrderHistory(prev => [
      savedOrder,
      ...prev
    ]);
    return savedOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrderHistory(prev => prev.map(order => order.id === orderId ? { ...order, status } : order));
    updateOrderStatusApi(orderId, status).catch(() => undefined);
  };

  return (
    <UserContext.Provider value={{ favorites, toggleFavorite, orderHistory, addOrder, updateOrderStatus }}>
      {children}
    </UserContext.Provider>
  );
};
