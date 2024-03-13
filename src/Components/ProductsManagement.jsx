import React from "react";
import DataContext from "./DataContext";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import { useState, useContext } from "react";
import styles from "../css/product-management.module.css";
import styleg from "../css/global.module.css";
import Header from "./Header.jsx";

function ProductsManagement() {
  const { products, setProducts } = useContext(DataContext);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddProduct = (newProduct) => {
    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.stockQuantity
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    setProducts([...products, { ...newProduct, id: newProduct.id }]);
    setAddModalOpen(false);
    setErrorMessage("");
  };

  const handleEditProduct = (editedProduct) => {
    if (
      !editedProduct.name ||
      !editedProduct.category ||
      !editedProduct.price ||
      !editedProduct.stockQuantity
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    const index = products.findIndex(
      (product) => product.id === editedProduct.id
    );
    if (index !== -1) {
      const updatedProducts = [...products];
      updatedProducts[index] = editedProduct;
      setProducts(updatedProducts);
      setEditModalOpen(false);
      setErrorMessage("");
    } else {
      setErrorMessage("Product not found.");
    }
  };

  const handleDeleteProduct = (productToDelete) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(
        products.filter((product) => product.id !== productToDelete.id)
      );
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setEditModalOpen(false);
  };

  return (
    <div className={styleg.parent}>
      <Header title="Product Management" />
      <div className={styles["products-management"]}>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <button
          className={styles["button-17"]}
          onClick={() => setAddModalOpen(true)}
        >
          Add Product
        </button>
        <div className={styles["product-cards"]}>
          {products.map((product) => (
            <div className={styles["product-card"]} key={product.id}>
              <h2>{product.name}</h2>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Stock Quantity: {product.stockQuantity}</p>
              <div className={styles["e-d-buttons"]}>
                <button
                  className={styles["button-3"]}
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
                <button
                  className={styles["button-4"]}
                  onClick={() => handleDeleteProduct(product)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAdd={handleAddProduct}
          products={products}
        />
        {selectedProduct && (
          <EditProductModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            product={selectedProduct}
            onEdit={handleEditProduct}
          />
        )}
      </div>
    </div>
  );
}

export default ProductsManagement;
