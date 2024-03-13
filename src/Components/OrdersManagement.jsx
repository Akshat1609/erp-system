import React, { useState, useContext } from "react";
import DataContext from "./DataContext";
import Header from "./Header";
import styles from "../css/global.module.css";
import styleo from "../css/orders-management.module.css";
import productsData from "../Data/mockProducts.js";
import StatusUpdateModal from "./StatusUpdateModal.jsx";

function OrdersManagement() {
  const { orders, setOrders } = useContext(DataContext);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isStatusUpdateModalOpen, setStatusUpdateModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleExpandOrder = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  const handleUpdateStatus = (newStaus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === selectedOrder.id) {
        return { ...order, status: newStaus };
      }
      return order;
    });
    setOrders(updatedOrders);
    setStatusUpdateModalOpen(false);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
    }
  };

  const getProductDetails = (productId) => {
    return productsData.find((product) => product.id === productId);
  };

  const openStatusUpdateModal = (order) => {
    setSelectedOrder(order);
    setStatusUpdateModalOpen(true);
  };

  const closeStatusUpdateModal = () => {
    setStatusUpdateModalOpen(false);
  };

  const handleCloseOverlay = () => {
    setExpandedOrderId(null);
  };

  const getTotalCartValue = (order) => {
    let total = 0;
    order.products.forEach((product) => {
      const productDetails = getProductDetails(product.id);
      total += productDetails.price * product.quantity;
    });
    return total;
  };

  return (
    <div className={styles.parent}>
      <Header title="Orders Management" />
      <div className={styleo["orders-management"]}>
        <div className={styleo["order-cards"]}>
          {orders.map((order) => (
            <div className={styleo["order-card"]} key={order.id}>
              <div className={styleo["card-header"]}>
                <p>Order ID: {order.id}</p>
                <button
                  className={styleo["button-3"]}
                  onClick={() => handleExpandOrder(order.id)}
                >
                  Expand
                </button>
              </div>
              <div className={styleo["order-details-container"]}>
                <p>Name: {order.customerName}</p>
                <p>Order Date: {order.orderDate}</p>
                <p>Status: {order.status}</p>
                <div className={styleo["e-u-d-buttons"]}>
                  <button
                    className={styleo["button-3"]}
                    onClick={() => openStatusUpdateModal(order)}
                  >
                    Update Status
                  </button>
                  <button
                    className={styleo["button-4"]}
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {expandedOrderId === order.id && (
                <div
                  className={styleo["order-details-overlay"]}
                  onClick={handleCloseOverlay}
                >
                  <div className={styleo["order-details"]}>
                    <h3>Order Details</h3>
                    {order.products.map((product) => {
                      const productDetails = getProductDetails(product.id);
                      const totalPrice =
                        productDetails.price * product.quantity;
                      return (
                        <div className={styleo["cartDetails"]} key={product.id}>
                          <p>Product Name: {productDetails.name}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Price: ${productDetails.price}</p>
                          <p>Total Price: ${totalPrice}</p>
                        </div>
                      );
                    })}
                    <div className={styleo["cartValue"]}>
                      Total Cart Value: ${getTotalCartValue(order)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <StatusUpdateModal
          isOpen={isStatusUpdateModalOpen}
          onClose={closeStatusUpdateModal}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
    </div>
  );
}

export default OrdersManagement;
