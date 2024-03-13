import React, { useState, useEffect, useContext } from "react";
import DataContext from "./DataContext";
import Header from "./Header";
import styles from "../css/global.module.css";
import styled from "../css/dashboard.module.css";
function Dashboard() {
  const { orders, products } = useContext(DataContext);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [topSellingProduct, setTopSellingProduct] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [receivedCount, setReceivedCount] = useState(0);
  const [dispatchedCount, setDispatchedCount] = useState(0);
  const [outForDeliveryCount, setOutForDeliveryCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);

  const calculateTotalRevenue = (ordersData) => {
    let totalRevenue = 0;
    ordersData.forEach((order) => {
      order.products.forEach((product) => {
        const productDetails = products.find((p) => p.id === product.id);
        if (productDetails) {
          totalRevenue += product.quantity * productDetails.price;
        }
      });
    });
    return totalRevenue;
  };

  const calculateAverageOrderValue = (ordersData) => {
    const totalRevenue = calculateTotalRevenue(ordersData);
    const totalOrders = ordersData.length;
    if (totalOrders === 0) {
      return 0;
    }

    const averageOrderValue = totalRevenue / totalOrders;
    return Math.round(averageOrderValue * 100) / 100;
  };

  const findTopSellingProduct = (ordersData, productsData) => {
    const productSalesMap = new Map();

    ordersData.forEach((order) => {
      order.products.forEach((product) => {
        const productId = product.id;
        const quantity = product.quantity;

        if (productSalesMap.has(productId)) {
          productSalesMap.set(
            productId,
            productSalesMap.get(productId) + quantity
          );
        } else {
          productSalesMap.set(productId, quantity);
        }
      });
    });

    let topSellingProductIds = [];
    let maxQuantitySold = 0;

    productSalesMap.forEach((quantitySold, productId) => {
      if (quantitySold >= maxQuantitySold) {
        maxQuantitySold = quantitySold;
      }
    });
    productSalesMap.forEach((quantitySold, productId) => {
      if (quantitySold === maxQuantitySold) {
        topSellingProductIds.push(productId);
      }
    });

    const topSellingProducts = topSellingProductIds.map((productId) => {
      const product = productsData.find((product) => product.id === productId);

      return product;
    });

    return topSellingProducts;
  };

  useEffect(
    () => {
      const totalProductsCount = products.length;
      const totalOrdersCount = orders.length;
      const totalRevenueValue = calculateTotalRevenue(orders);
      const avgOrderValue = calculateAverageOrderValue(orders);
      const topSellingProduct = findTopSellingProduct(orders, products);

      setTotalProducts(totalProductsCount);
      setTotalOrders(totalOrdersCount);
      setTotalRevenue(totalRevenueValue);
      setAverageOrderValue(avgOrderValue);
      setTopSellingProduct(topSellingProduct);

      let pending = 0,
        received = 0,
        dispatched = 0,
        outForDelivery = 0,
        delivered = 0;
      orders.forEach((order) => {
        switch (order.status) {
          case "Pending":
            pending += 1;
            break;
          case "Received":
            received += 1;
            break;
          case "Dispatched":
            dispatched += 1;
            break;
          case "Out for delivery":
            outForDelivery += 1;
            break;
          case "Delivered":
            delivered += 1;
            break;
          default:
            break;
        }
      });

      setPendingCount(pending);
      setReceivedCount(received);
      setDispatchedCount(dispatched);
      setOutForDeliveryCount(outForDelivery);
      setDeliveredCount(delivered);
    },
    [orders],
    [products]
  );

  return (
    <div className={styles.parent}>
      <Header title="Dashboard" />
      <div className={styled.dashboard}>
        <div className={styled.metricContainer}>
          <div className={styled.metricBox}>
            <h2>Total number of products</h2>
            <p> {totalProducts} </p>
          </div>
          <div className={styled.metricBox}>
            <h2>Total number of orders</h2>
            <p> {totalOrders}</p>
          </div>
          <div className={styled.metricBox}>
            <h2>Total Revenue</h2>
            <p> ${totalRevenue}</p>
          </div>
          <div className={styled.metricBox}>
            <h2>Average Order Value</h2>
            <p>${averageOrderValue}</p>
          </div>
        </div>
        <div className={styled.metricContainer}>
          <div className={styled.metricBox}>
            <h2>Top Seller</h2>
            {topSellingProduct.map((product) => (
              <p key={product.id}>{product.name}</p>
            ))}
          </div>
          <div className={styled.metricBox}>
            <h2>Order Status Count</h2>
            <div className={styled.statusList}>
              <p>Pending: {pendingCount}</p>
              <p>Received: {receivedCount}</p>
              <p>Dispatched: {dispatchedCount}</p>
              <p>Out for Delivery: {outForDeliveryCount}</p>
              <p>Delivered: {deliveredCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
