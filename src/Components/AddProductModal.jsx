import React, { useState } from "react";
import styles from "../css/modal-dialog.module.css";

function AddProductModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category || !price || !stockQuantity) {
      setErrorMessage("All fields are required.");
      return;
    }

    onAdd({ name, category, price, stockQuantity });
    setName("");
    setCategory("");
    setPrice("");
    setStockQuantity("");
    onClose();
  };

  return (
    <div>
      {isOpen && (
        <div className={styles["modal-overlay"]}>
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <div className={styles["modal-header"]}>
                <h2>Add Product</h2>
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
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProductModal;
