import React, { useContext, useState } from 'react';
import styles from '../css/global.module.css';
import stylec from '../css/calendar.module.css';  
import Header from './Header';
import DataContext from './DataContext';

function Calendar() {
  const { orders, products } = useContext(DataContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

   
  const handleDateClick = (date) => {
    const formattedDate = formatDate(new Date(currentYear, currentMonth, date));
    if (selectedDate === formattedDate) {
       
      setSelectedDate(null);
    } else {
      setSelectedDate(formattedDate);
    }
  };

   
  const prevMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear(prevYear => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };

   
  const nextMonth = () => {
    setCurrentMonth(nextMonth => (nextMonth === 11 ? 0 : nextMonth + 1));
    setCurrentYear(nextYear => (currentMonth === 11 ? nextYear + 1 : nextYear));
  };

   
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

   
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

   
  const monthDays = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <div className={styles.parent}>
      <Header title="Calendar View" />
      <div className={stylec['calendar-page']}>
        <div className={stylec['calendar-header']}>
          <button onClick={prevMonth}>&lt;</button>
          <h2>{months[currentMonth]} {currentYear}</h2>
          <button onClick={nextMonth}>&gt;</button>
        </div>
        <div className={stylec.calendar}>
          {/* Render calendar cells with delivery dates */}
          {monthDays.map((day, index) => {
             
            const filteredOrders = orders.filter(order => {
              const orderDate = new Date(order.deliveryDate);
              return (
                orderDate.getFullYear() === currentYear &&
                orderDate.getMonth() === currentMonth &&
                orderDate.getDate() === day
              );
            });

            return (
              <div
                key={index}
                className={`${stylec['calendar-cell']} ${selectedDate === formatDate(new Date(currentYear, currentMonth, day)) ? stylec['selected'] : ''}`}
                onClick={() => handleDateClick(day)}
              >
                <span>{day}</span>
                {/* Show number of orders scheduled for delivery on the current day */}
                {filteredOrders.length > 0 && (
                  <div className={stylec['order-count']}>
                    <p>{filteredOrders.length} {filteredOrders.length > 1 ? 'Orders' : 'Order'} </p>
                    {/* Display order IDs */}
                    {filteredOrders.map(order => (
                      <p key={order.id}>Order ID: {order.id}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Show orders for the selected date */}
      {selectedDate && (
        <div className={stylec['order-card']}>
          <h2>Orders for {new Date(selectedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
          <ul>
            {orders
              .filter(order => order.deliveryDate === selectedDate)
              .map(order => (
                <div key={order.id}>
                  {order.customerName}
                  <ul>
                    {order.products.map(product => (
                      <li key={product.id}>
                        {products.find(p => p.id === product.id).name} X {product.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Calendar;
