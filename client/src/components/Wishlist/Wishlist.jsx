import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useSnackbar } from "react-simple-snackbar";
import "./wishlist.scss";
import axios from "axios";
import history from "../../history";
import loader from "../../assets/loading.gif";
import { ReactComponent as Nologin } from "../../assets/nologin.svg";
const Wishlist = () => {
  const [arr, setArr] = useState(null);
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
          `https://electrobuy.herokuapp.com/api/v1/users/getAllWishlistProduct`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setArr(data.data);
      } catch (err) {
        openSnackbar(err.response?.data?.message);
      }
    };
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const removeitem = async (curr) => {
    const token = window.localStorage.getItem("token");
    try {
      // console.log(curr.target?.dataset?.id);
      const { data } = await axios.delete(
        `https://electrobuy.herokuapp.com/api/v1/users/addWishlistProduct/${curr.target?.dataset?.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setArr(data.data);
      openSnackbar("item removed");
    } catch (err) {
      // console.log(err);
    }
  };
  const loginclick = () => {
    history.push("/login");
  };
  const addCart = async (el) => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    } else {
      try {
        const data = await axios.post(
          `https://electrobuy.herokuapp.com/api/v1/users/addCartProduct/${el.target.dataset?.id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(data);
        if (data.data.status === "success") {
          openSnackbar("item added successfully to Cart");
        }
      } catch (err) {
        // console.log(err);
      }
    }
  };
  const renderWishlist = () => {
    if (!arr) return <img className="loading" src={loader} alt="loading.." />;
    else if (arr.length === 0) {
      return (
        <div className="NO_ITEMS">No items in your wishlist.Start Adding!!</div>
      );
    } else {
      return arr.map((el) => {
        return (
          <div key={el.id} className="wishlist_cont-item">
            <img
              src={el.imageArr[0]}
              className="wishlist_cont-item-img"
              alt="product"
            />
            <div className="wishlist_cont-item-info">
              <div className="wishlist_cont-item-title">{el.fullName}</div>
              <div className="wishlist_cont-item-price">
                Price :{" "}
                <span className="wishlist_cont-item-price-get">
                  {" "}
                  ₹{el.finalPrice}
                </span>{" "}
                /
                <span className="wishlist_cont-item-price-original">
                  {" "}
                  ₹{el.originalPrice}
                </span>
              </div>
              <div className="wishlist_cont-item-btns">
                <button
                  data-id={el.id}
                  onClick={(curr) => removeitem(curr)}
                  className="wishlist_cont-item-remove"
                >
                  Remove
                </button>
                <button
                  data-id={el.id}
                  onClick={(el) => addCart(el)}
                  className="wishlist_cont-item-move"
                >
                  Add to cart
                </button>
              </div>
              <div className="wishlist_cont-item-rating">
                {" "}
                <span className="wishlist_cont-item-rating-none"></span>★
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
      <div className="wishlist">
        {window.localStorage.getItem("token") ? (
          <div>
            {" "}
            <div className="wishlist-heading">
              My Wishlist{" "}
              <span className="wishlist-heading-count">
                {arr?.length} items
              </span>
            </div>
            <div className="wishlist_cont">{renderWishlist()}</div>
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
      <Footer />
    </div>
  );
};
export default Wishlist;
