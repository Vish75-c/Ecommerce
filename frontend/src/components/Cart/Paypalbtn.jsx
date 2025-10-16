import React from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";

const Paypalbtn = ({ amount = "10.00", onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "ATQ1PkeWJkYGanEM6dBCrJh4gCfBHhSDMLNzkHDlV-I6t-4HYjONGFJTJhxHLT-tJ5qvGgpkIzNEzkEH", // 👈 replace this
        currency: "USD",
      }}
    >
      <div className="flex flex-col items-center w-full gap-3">
        <PayPalButtons
          style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toString(), // must be string
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name;
              alert(`✅ Transaction completed by ${name}`);
              if (onSuccess) onSuccess(details);
            });
          }}
          onError={(err) => {
            console.error("PayPal Error:", err);
            alert("❌ Payment failed");
            if (onError) onError(err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default Paypalbtn;
