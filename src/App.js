import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./Components/DataContext";
import Dashboard from "./Components/Dashboard";
import ProductsManagement from "./Components/ProductsManagement";
import OrdersManagement from "./Components/OrdersManagement";
import CalendarView from "./Components/CalendarView";

function App() {
  return (
    <Router>
      <div>
        <DataProvider>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/products" element={<ProductsManagement />} />
            <Route path="/orders" element={<OrdersManagement />} />
            <Route path="/calendar" element={<CalendarView />} />
          </Routes>
        </DataProvider>
      </div>
    </Router>
  );
}

export default App;
