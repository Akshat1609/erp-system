import React, { useState } from "react";
import styles from "../css/modal-dialog.module.css";

function EditProductModal({ isOpen, onClose, product, onEdit }) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [stockQuantity, setStockQuantity] = useState(product.stockQuantity);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !price || !stockQuantity) {
      setErrorMessage("All fields are required.");
      return;
    }

    onEdit({ ...product, name, category, price, stockQuantity });

    onClose();
  };

  return (
    <div>
      {isOpen && (
        <div className={styles["modal-overlay"]}>
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <div className={styles["modal-header"]}>
                <h2>Edit Product</h2>
                <span className={styles.close} onClick={onClose}>
                  &times;
                </span>
              </div>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Category:</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
                <label>Price:</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <label>Stock Quantity:</label>
                <input
                  type="number"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  required
                />
                <button type="submit">Edit Product</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProductModal;
