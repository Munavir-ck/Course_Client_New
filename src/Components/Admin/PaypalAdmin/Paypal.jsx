import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "../../../axios/axios";



function Paypal({ amount,teacherId, transaction_id }) {
//   const [modal, setmodal] = useState(false);
  const[success,setSucces]=useState(false)

  success&&toast.success("success")
 

  const shareProfit= (order_id) => {
    axios
      .post(
        "/admin/share_profit",
        {amount,teacherId ,transaction_id},
        {
          headers: {
            Authorization: localStorage.getItem("admintoken"),
          },
        }
      )
      .then((res) => {
       
        setSucces(true)
        
      });
  };
  return (
    <div>
    
       < ToastContainer/>
        <PayPalScriptProvider
          options={{
            "client-id": process.env.REACT_APP_CLIENT_ID,
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
                        value: amount,
                      },
                    },
                  ],
                })
                .then((orderId) => {
                   
                  return orderId;
                });
            }}
            onApprove={async function (data, actions) {
              return actions.order.capture().then(function () {
                // Your code here after capture the order
                if (data.orderID) {
                    shareProfit(data.orderID);
                 
                  alert("its completed");
                } else {
                }
              });
            }}
          />
        </PayPalScriptProvider>
      
    </div>
  );
}

export default Paypal;
