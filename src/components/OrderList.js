import React from "react";
import LeftHeading from "./LeftHeading";

const OrderList = ({ orders, alignment }) => {
  const Order = ({ order }) => {
    console.log(order);
    return (
      <div className="order">
        <h2>{order.userName}</h2>
        <p>{order.userEmail}</p>
        <p>{order.address}</p>

        <div className="order-items">
          {order.products.map((item) => (
            <div className="order-item" key={item.name + item.size}>
              <p>
                {item.name} {item.size}
              </p>
              <p>{item.quantity}</p>
              <p>${item.price * item.quantity}</p>
            </div>
          ))}
          <p>Total: ${order.total}</p>
        </div>
      </div>
    );
  };

  console.log("orders", orders);

  return (
    <>
      {alignment === "left" ? <LeftHeading text="Orders" /> : <h2>Orders</h2>}
      {orders.length > 0 ? (
        orders.map((order) => <Order order={order} key={order.id} />)
      ) : (
        <p>No orders</p>
      )}
    </>
  );
};

export default OrderList;
