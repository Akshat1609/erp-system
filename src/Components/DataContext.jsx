import React, { createContext, useState, useEffect } from "react";
import mockProducts from "../Data/mockProducts.js";
import mockOrders from "../Data/mockOrders.js";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setProducts(mockProducts);
    setOrders(mockOrders);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [products, orders]);

  return (
    <DataContext.Provider value={{ products, setProducts, orders, setOrders }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
