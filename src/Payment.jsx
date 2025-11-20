import React, { useState } from "react";
import "./payment.css";
import { toast } from "react-toastify";

function Payment({ total, paymentMethod, setPaymentMethod, closeModal,setTotal }) {
  const [details, setDetails] = useState({
    cardName: "",
    cardNumber: "",
    cvv: "",
    upiId: "",
    address: ""
  });
  const [viewCVV, setViewCVV] = useState(false);
  function toggleCVV() {
  setViewCVV(!viewCVV);
}

  function handlePayment() {
    toast.success("Order placed successfully!");
    closeModal();
    setTotal(0)
    
  }

  return (
    <div className="modal-bg">
      <div className="modal-box animate-popup">

        <button className="close-btn" onClick={closeModal}>✖</button>

        <h2>Pay ${total}</h2>

        <div className="payment-options">
          <label><input type="radio" value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)} /> Card</label>

          <label><input type="radio" value="upi"
            checked={paymentMethod === "upi"}
            onChange={(e) => setPaymentMethod(e.target.value)} /> UPI</label>

          <label><input type="radio" value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)} /> COD</label>
        </div>

        <hr />

        {/* CARD */}
        {paymentMethod === "card" && (
          <div className="form-section">
            <input type="text" placeholder="Card Holder Name"
              onChange={(e) => setDetails({ ...details, cardName: e.target.value })} />

            <input type="text" maxLength={16} placeholder="Card Number"
              onChange={(e) => setDetails({ ...details, cardNumber: e.target.value })} />

<div className="cvv-box">
  <input
    type={viewCVV ? "text" : "password"}
    placeholder="CVV"
    maxLength={3}
    onChange={(e) =>
      setDetails({ ...details, cvv: e.target.value })
    }
  />

  <button type="button" className="cvv-toggle" onClick={toggleCVV}>
    {viewCVV ? "Hide" : "View"}
  </button>
</div>

            <button onClick={handlePayment}>Pay Now</button>
          </div>
        )}

        {/* UPI */}
        {paymentMethod === "upi" && (
          <div className="form-section">
            <input type="text" placeholder="Enter UPI ID"
              onChange={(e) => setDetails({ ...details, upiId: e.target.value })} />

            <button onClick={handlePayment}>Pay Now</button>
          </div>
        )}

        {/* COD */}
        {paymentMethod === "cod" && (
          <div className="form-section">
            <input type="text" placeholder="Delivery Address"
              onChange={(e) => setDetails({ ...details, address: e.target.value })} />

            <button onClick={handlePayment}>Place Order</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
