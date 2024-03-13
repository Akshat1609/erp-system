import React, { useState } from "react";
import styles from "../css/modal-dialog.module.css";

function StatusUpdateModal({ isOpen, onClose, onUpdateStatus }) {
  const [status, setStatus] = useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(status);
    onClose();
  };

  return (
    <div>
      {isOpen && (
        <div className={styles["modal-overlay"]}>
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <div className={styles["modal-header"]}>
                <h2>Update Status</h2>
                <span className={styles.close} onClick={onClose}>
                  &times;
                </span>
              </div>
              <form onSubmit={handleSubmit}>
                <label>
                  <input
                    type="radio"
                    value="Pending"
                    checked={status === "Pending"}
                    onChange={() => setStatus("Pending")}
                  />
                  Pending
                </label>
                <label>
                  <input
                    type="radio"
                    value="Received"
                    checked={status === "Received"}
                    onChange={() => setStatus("Received")}
                  />
                  Received
                </label>
                <label>
                  <input
                    type="radio"
                    value="Dispatched"
                    checked={status === "Dispatched"}
                    onChange={() => setStatus("Dispatched")}
                  />
                  Dispatched
                </label>
                <label>
                  <input
                    type="radio"
                    value="Out_for_delivery"
                    checked={status === "Out for delivery"}
                    onChange={() => setStatus("Out for delivery")}
                  />
                  Out for delivery
                </label>
                <label>
                  <input
                    type="radio"
                    value="Delivered"
                    checked={status === "Delivered"}
                    onChange={(e) => setStatus("Delivered")}
                  />
                  Delivered
                </label>
                <button type="submit">Update Status</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusUpdateModal;
