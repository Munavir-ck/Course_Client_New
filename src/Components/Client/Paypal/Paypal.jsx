import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";
import ModalSuccess from "../Modal/ModalSuccess";

function Paypal({ amount, checkedValues }) {
  const [order, setOrder] = useState("");
  const [modal, setModal] = useState(false);

  const totalAmount = checkedValues.length * amount;


  const student = useSelector((state) => state.student._id);
  let { id } = useParams();

  const createOrder = (order_id) => {
    axios
      .post(
        "/creat_booking",
        { student, slot: checkedValues, amount, teacher: id, order_id },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setOrder(res.data.result);
        } else {
          console.error("Booking creation failed:", res.data.message);
          alert("There was an issue with the booking creation.");
        }
      })
      .catch((error) => {
        console.error("Error during booking creation:", error);
        alert("Booking creation failed. Please try again.");
      });
  };


  

  return (
    <div>
      {modal ? (
        <ModalSuccess modal={modal} setModal={setModal} />
      ) : (
        <PayPalScriptProvider
          options={{
            "client-id": process.env.REACT_APP_CLIENT_ID,
            "currency": "USD", // Add currency if needed
            "components": "buttons",
            "debug": true, // Enable debug mode for detailed logs
          }}
        >
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalAmount,
                      },
                    },
                  ],
                })
                .then((orderId) => {
                  console.log("Order created: ", orderId);
                  return orderId;
                })
                .catch((error) => {
                  console.error("Error creating PayPal order: ", error);
                  alert("Error creating order. Please try again.");
                });
            }}
            onApprove={(data, actions) => {
              return actions.order
                .capture()
                .then(function (details) {
                  if (data.orderID) {
                    createOrder(data.orderID);
                    setModal(true);
                    alert("Payment completed!");
                  } else {
                    console.error("Payment failed: No order ID received.");
                    alert("Payment failed. Please try again.");
                  }
                })
                .catch((error) => {
                  console.error("Payment capture failed:", error);
                  alert("An error occurred during payment. Please try again.");
                });
            }}
            onError={(error) => {
              console.error("PayPal error:", error);
              alert("An error occurred with PayPal. Please try again.");
            }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
}

export default Paypal;
