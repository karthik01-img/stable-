import React, { useEffect, useState } from 'react';
import Payment from "./Payment";
import "./Product.css";
import { ToastContainer, toast } from "react-toastify";

function Product() {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [showCartModal, setShowCartModal] = useState(false);


    const [showPayment, setShowPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");

    async function fdata() {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const result = await response.json();
        setData(result);
        setLoading(false);
    }

    useEffect(() => {
        fdata();
    }, []);

    function addtocart(item) {
        const exists = cart.find((i) => i.id === item.id);

        if (!exists) {
            setCart([...cart, { ...item, quantity: 1 }]);

            toast.success("Added to cart!");
        } else {
            toast.warning("Already in cart!");
        }
    }

    function removefromcart(item) {
        setCart(cart.filter((i) => i.id !== item.id));
        toast.error("Removed from cart!");
    }

    function calculateTotal() {
        var sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

        setTotal(sum);
        setShowPayment(true);
    }

    const filteredProducts = data.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "all" || item.category === category)
    );

    function increase(item) {
  const updated = cart.map((i) =>
    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
  );
  setCart(updated);
}

function decrease(item) {
  if (item.quantity === 1) {
    // remove item if quantity becomes 0
    removefromcart(item);
  } else {
    const updated = cart.map((i) =>
      i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
    );
    setCart(updated);
  }
}


    return (
        <div className="main-bg">

            {/* Navbar */}
            <nav className="navbar">
                <h1 className="logo">FAKESTORE+</h1>

                <input type="text"
                    className="nav-search"
                    placeholder="Search Products..."
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button onClick={() => setShowCartModal(true)} className="cart-count">
  🛒 {cart.length}
</button>

            </nav>

            {/* Category Filter */}
            <div className="category-bar">
                <button onClick={() => setCategory("all")}>All</button>
                <button onClick={() => setCategory("men's clothing")}>Men</button>
                <button onClick={() => setCategory("women's clothing")}>Women</button>
                <button onClick={() => setCategory("electronics")}>Electronics</button>
                <button onClick={() => setCategory("jewelery")}>Jewellery</button>
            </div>

            {/* Loader */}
            {loading && (
                <div className="loader"></div>
            )}

            {/* Product Grid */}
            <div className="product-grid">
                {!loading &&
                    filteredProducts.map((item) => (
                        <div key={item.id} className="product-card">
                            <img src={item.image} alt="" />
                            <h3>{item.title}</h3>
                            <p>${item.price}</p>
                            <button onClick={() => addtocart(item)}>Add to Cart</button>
                        </div>
                    ))
                }
            </div>

            {/* Cart */}
            
{showCartModal && (
  <div className="modal-bg">
    <div className="modal-box animate-popup cart-modal">

      <button className="close-btn" onClick={() => setShowCartModal(false)}>✖</button>

      <h2>Your Cart ({cart.length})</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} />

          <div>
            <h4>{item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title}</h4>
            <p>${item.price.toFixed(2)}</p>

            <div className="qty-box">
              <button onClick={() => decrease(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increase(item)}>+</button>
            </div>
          </div>

          <button className="remove-btn" onClick={() => removefromcart(item)}>
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <button className="total-btn" onClick={() => {
          setShowCartModal(false);
          calculateTotal();
        }}>
          Proceed to Payment (${total.toFixed(2)})
        </button>
      )}

    </div>
  </div>
)}

            {/* Payment Modal */}
            {showPayment && (
                <Payment
                    total={total}
                    setTotal={setTotal}  
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    closeModal={() => setShowPayment(false)
                    
                    }
                />
            )}

            <ToastContainer />
        </div>
    );
}

export default Product;
