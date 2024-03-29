import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./cart.scss";
import axios from "axios";
import history from "../../history";
import loader from "../../assets/loading.gif";
import { ReactComponent as Nologin } from "../../assets/nologin.svg";
import { ReactComponent as Card } from "../../assets/card.svg";
import { ReactComponent as Master } from "../../assets/master.svg";
import { ReactComponent as CardBrand } from "../../assets/cardbrand.svg";
import { ReactComponent as Dark } from "../../assets/Dark.svg";
import { useSnackbar } from "react-simple-snackbar";
import cardno from "../../assets/cardno.png";
import cardmonth from "../../assets/cardmonth.png";
import cvv from "../../assets/cvv.png";

const Cart = () => {
  const [arr, setArr] = useState(null);
  const [final, setFinal] = useState(0);
  const [dis, setDis] = useState(0);
  const [original, setOriginal] = useState(0);
  const [view, setView] = useState(0);
  const options = {
    position: "top-left",
    style: {
      // backgroundColor: '#930696',
      background: "linear-gradient(180deg, #5e3173 0.31%, #000000 102.17%)",
      color: "white",
      fontFamily: "Montserrat, sans-serif",
      fontSize: "16px",
      textAlign: "center",
    },
    closeStyle: {
      color: "black",
      fontSize: "10px",
    },
  };
  const [openSnackbar] = useSnackbar(options);
  useEffect(() => {
    const getdata = async () => {
      const token = window.localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          `https://electrobuy.herokuapp.com/api/v1/users/getAllCartProduct`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(data);
        setArr(data.data);
        setFinal(data.totalFinalPrice);
        setDis(data.totalSavingPrice);
        setOriginal(data.totalOriginalPrice);
      } catch (err) {
        openSnackbar(err.response?.data?.message);
      }
    };
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loginclick = () => {
    history.push("/login");
  };
  const shipping = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        "https://electrobuy.herokuapp.com/api/v1/payments",
        {
          transactionAmount: final,
          transactionGoods: arr.map((el) => el._id),
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
      // console.log(err?.response?.data);
    }
  };
  const removeitem = async (curr) => {
    const token = window.localStorage.getItem("token");
    try {
      // console.log(curr.target?.dataset?.id);
      const { data } = await axios.delete(
        `https://electrobuy.herokuapp.com/api/v1/users/addCartProduct/${curr.target?.dataset?.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(data.data);
      setArr(data.data);
      setFinal(data.totalFinalPrice);
      setDis(data.totalSavingPrice);
      setOriginal(data.totalOriginalPrice);
      openSnackbar("item removed");
    } catch (err) {
      // console.log(err);
    }
  };
  const addWishlist = async (el) => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    } else {
      try {
        const data = await axios.post(
          `https://electrobuy.herokuapp.com/api/v1/users/addWishlistProduct/${el.target.dataset?.id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(data);
        if (data.data.status === "success") {
          openSnackbar("item added successfully to Wishlist");
        }
      } catch (err) {
        // console.log(err);
      }
    }
  };
  const renderCart = () => {
    if (!arr) return <img className="loading" src={loader} alt="loading.." />;
    else if (arr.length === 0) {
      return (
        <div className="NO_ITEMS">No items in your cart.Start shopping!!</div>
      );
    } else {
      return arr.map((el) => {
        return (
          <div key={el.id} className="cart_cont-item">
            <img
              src={el.imageArr[0]}
              className="cart_cont-item-img"
              alt="product"
            />
            <div className="cart_cont-item-info">
              <div className="cart_cont-item-title">{el.fullName}</div>
              <div className="cart_cont-item-price">
                Price :{" "}
                <span className="cart_cont-item-price-get">
                  ₹{el.finalPrice}
                </span>{" "}
                /
                <span className="cart_cont-item-price-original">
                  ₹{el.originalPrice}
                </span>
              </div>
              <div className="cart_cont-item-btns">
                <button
                  data-id={el.id}
                  onClick={(curr) => removeitem(curr)}
                  className="cart_cont-item-remove"
                >
                  Remove
                </button>
                <button
                  data-id={el.id}
                  onClick={(curr) => addWishlist(curr)}
                  className="cart_cont-item-move"
                >
                  Add to wishlist
                </button>
              </div>
              <div className="cart_cont-item-rating">
                <span className="cart_cont-item-rating-none"></span> ★{" "}
                {el.averageRating}
              </div>
            </div>
          </div>
        );
      });
    }
  };
  return (
    <div>
      <Header />
      <div className="cart">
        {window.localStorage.getItem("token") ? (
          <div>
            <div className="cart-heading">
              My cart{" "}
              <span className="cart-heading-count">{arr?.length} items</span>
            </div>
            <div className="cart_cont">{renderCart()}</div>
            {arr?.length !== 0 ? (
              <div className="order">
                <div className="order-title">Order Details</div>
                <div className="order-price">
                  <div className="order-price-title">Total Price</div>
                  <div className="order-price-value">
                    &#8377; {original?.toLocaleString()}
                  </div>
                </div>
                <div className="order-discount">
                  <div className="order-discount-title">Discount</div>
                  <div className="order-discount-value">
                    &#8377; {dis?.toLocaleString()}
                  </div>
                </div>
                <div className="order-delivery">
                  <div className="order-delivery-title">Delivery</div>
                  <div className="order-delivery-value">&#8377; 50</div>
                </div>
                <div className="order-total">
                  <div className="order-total-title">Total Amount</div>
                  <div className="order-total-value">
                    &#8377; {(final + 50)?.toLocaleString()}
                  </div>
                </div>
                <button onClick={() => shipping()} className="order-btn">
                  Proceed to shipping &rarr;
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div className="nologin">
            <Nologin className="nologin-img" />
            <div className="nologin-info">
              <button onClick={loginclick} className="nologin-info-btn">
                login
              </button>
              <div className="nologin-info-txt">
                To get access to wishlist, cart and more!
              </div>
            </div>
          </div>
        )}
      </div>
      {view === 0 ? (
        <div className="dcard">
          <Card className="dcard-back" />
          <Master className="dcard-master" />
          <CardBrand className="dcard-brand" />
          <Dark className="dcard-dark" />
          <img src={cardno} alt={"4242424242424242"} className="dcard-no" />
          <img src={cardmonth} alt={"02/23"} className="dcard-mo" />
          <img src={cvv} alt={"123"} className="dcard-cvvv" />
          <div className="dcard-cvv">cvv:</div>
          <div className="dcard-use">use this debit card for payments</div>
          <button onClick={() => setView(1)} className="dcard-close">
            x
          </button>
        </div>
      ) : (
        <button onClick={() => setView(0)} className="dcard-view">
          viewCard
        </button>
      )}
      <Footer />
    </div>
  );
};
export default Cart;
