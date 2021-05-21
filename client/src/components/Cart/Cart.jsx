import { useState, useRef } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./cart.scss";
import mobile3 from "../../assets/mobiles/mobile3.jpg";
import axios from "axios";
const Cart = () => {
  // const [mid, setMid] = useState('');
  // const [txntoken, setTxntoken] = useState('');
  // const [orderId, setOrderId] = useState('');
  // const formTo = useRef();

  const shipping = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8080/api/v1/payments",
        {
          transactionAmount: 500,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute(
        "action",
        `https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${data.data.mid}&orderId=${data.data.orderId}`
      );
      const input1 = document.createElement("input");
      input1.setAttribute("type", "hidden");
      input1.setAttribute("name", "mid");
      input1.setAttribute("value", data.data.mid);
      const input2 = document.createElement("input");
      input2.setAttribute("type", "hidden");
      input2.setAttribute("name", "orderId");
      input2.setAttribute("value", data.data.orderId);
      const input3 = document.createElement("input");
      input3.setAttribute("type", "hidden");
      input3.setAttribute("name", "txnToken");
      input3.setAttribute("value", data.data.txnToken);
      form.appendChild(input1);
      form.appendChild(input2);
      form.appendChild(input3);
      document.body.appendChild(form);
      form.submit();
      form.remove();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      <Header />
      <div className="cart">
        <div className="cart-heading">
          My cart <span className="cart-heading-count">3 items</span>
        </div>
        <div className="cart_cont">
          <div className="cart_cont-item">
            <img src={mobile3} className="cart_cont-item-img" alt="product" />
            <div className="cart_cont-item-info">
              <div className="cart_cont-item-title">
                Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage)
              </div>
              <div className="cart_cont-item-price">
                Price :{" "}
                <span className="cart_cont-item-price-get"> ₹23210</span> /
                <span className="cart_cont-item-price-original"> ₹29000</span>
              </div>
              <div className="cart_cont-item-btns">
                <button className="cart_cont-item-remove">Remove</button>
                <button className="cart_cont-item-move">
                  Move to wishlist
                </button>
              </div>
              <div className="cart_cont-item-rating">
                <span className="cart_cont-item-rating-none">Rating:</span> ★4.2
              </div>
            </div>
          </div>
          <div className="cart_cont-item">
            <img src={mobile3} className="cart_cont-item-img" alt="product" />
            <div className="cart_cont-item-info">
              <div className="cart_cont-item-title">
                Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage)
              </div>
              <div className="cart_cont-item-price">
                Price :{" "}
                <span className="cart_cont-item-price-get"> ₹23210</span> /
                <span className="cart_cont-item-price-original"> ₹29000</span>
              </div>
              <div className="cart_cont-item-btns">
                <button className="cart_cont-item-remove">Remove</button>
                <button className="cart_cont-item-move">
                  Move to wishlist
                </button>
              </div>
              <div className="cart_cont-item-rating">
                <span className="cart_cont-item-rating-none">Rating:</span> ★4.2
              </div>
            </div>
          </div>
          <div className="cart_cont-item">
            <img src={mobile3} className="cart_cont-item-img" alt="product" />
            <div className="cart_cont-item-info">
              <div className="cart_cont-item-title">
                Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage)
              </div>
              <div className="cart_cont-item-price">
                Price :{" "}
                <span className="cart_cont-item-price-get"> ₹23210</span> /
                <span className="cart_cont-item-price-original"> ₹29000</span>
              </div>
              <div className="cart_cont-item-btns">
                <button className="cart_cont-item-remove">Remove</button>
                <button className="cart_cont-item-move">
                  Move to wishlist
                </button>
              </div>
              <div className="cart_cont-item-rating">
                <span className="cart_cont-item-rating-none">Rating:</span> ★4.2
              </div>
            </div>
          </div>
        </div>
        <div className="order">
          <div className="order-title">Order Details</div>
          <div className="order-price">
            <div className="order-price-title">Total Price</div>
            <div className="order-price-value"> ₹23210</div>
          </div>
          <div className="order-discount">
            <div className="order-discount-title">Discount</div>
            <div className="order-discount-value"> ₹1000</div>
          </div>
          <div className="order-delivery">
            <div className="order-delivery-title">Delivery</div>
            <div className="order-delivery-value"> ₹50</div>
          </div>
          <div className="order-total">
            <div className="order-total-title">Total Amount</div>
            <div className="order-total-value"> ₹25210</div>
          </div>
          <button onClick={() => shipping()} className="order-btn">
            Proceed to sipping &rarr;
          </button>
        </div>
      </div>

      {/* <form
        ref={formTo}
        method="post"
        action={`https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${mid}&orderId=${orderId}`}
        // action="https://www.youtube.com"
        name="paytm"
      >
        <input type="hidden" name="mid" value={mid} />
        <input type="hidden" name="orderId" value={orderId} />
        <input type="hidden" name="txnToken" value={txntoken} />
        <button type="submit" onClick={(e) => handlesubmit(e)}>
          paytm karo
        </button>
      </form> */}
      <Footer />
    </div>
  );
};
export default Cart;
