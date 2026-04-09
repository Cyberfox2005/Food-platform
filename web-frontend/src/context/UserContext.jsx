import { createContext, useContext, useState, useEffect } from 'react';

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
    setOrderHistory(prev => [
      { ...order, id: Date.now(), date: new Date().toISOString() },
      ...prev
    ]);
  };

  return (
    <UserContext.Provider value={{ favorites, toggleFavorite, orderHistory, addOrder }}>
      {children}
    </UserContext.Provider>
  );
};
