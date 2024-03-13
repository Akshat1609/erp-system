import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../css/global.module.css";

function Header({ title }) {
  const isActive = (match, location) => {
    console.log("Match:", match);
    console.log("Location:", location);

    return match && match.url === location.pathname;
  };

  return (
    <div className={styles.header}>
      <h1 className={styles["h-1"]}>{title}</h1>
      <nav className={styles.navi}>
        <NavLink to="/" className={styles.navLink}>
          Dashboard
        </NavLink>
        <NavLink to="/products" className={styles.navLink}>
          Products
        </NavLink>
        <NavLink to="/orders" className={styles.navLink}>
          Orders
        </NavLink>
        <NavLink to="/calendar" className={styles.navLink}>
          Calendar View
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;
