import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import "./SearchResults.scss";
import React from "react";
import Header from "../Header";
import { ReactComponent as WishList } from "../../assets/wishlistcard.svg";
import { fetchCategoryProducts } from "../../actions";
import history from "../../history";
import axios from "axios";
import loader from "../../assets/loading.gif";
const SearchResults = (props) => {
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
    props.fetchCategoryProducts(props.match.params.id, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addWishlist = async (el) => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    } else {
      try {
        const data = await axios.post(
          `http://127.0.0.1:8080/api/v1/users/addWishlistProduct/${el.target.parentElement?.dataset?.id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.data.status === "success") {
          openSnackbar("item added to wishlist");
        }
      } catch (err) {
        openSnackbar(err.response?.data?.message);
      }
    }
  };
  const addCart = async (el) => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    } else {
      try {
        const data = await axios.post(
          `http://127.0.0.1:8080/api/v1/users/addCartProduct/${el.target.dataset?.id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.data.status === "success") {
          openSnackbar("item added to cart");
        }
      } catch (err) {
        openSnackbar(err.response?.data?.message);
      }
    }
  };
  const renderProductItems = () => {
    if (!props.data[0])
      return <img className="loading" src={loader} alt="loading.." />;
    else if (props.data[0].category !== props.match.params.id)
      return <img className="loading" src={loader} alt="loading.." />;
    else {
      return props.data.map((el) => {
        return (
          <div className="procard" key={el.id}>
            <Link className="Link" to={`/productInfo/${el.id}`}>
              <img src={el.imageArr[0]} alt="product" className="procard-img" />
            </Link>
            <div className="procard-bottom">
              <div className="procard-info">
                <div className="procard-info-name">
                  {el.fullName.slice(0, 150)}
                </div>
                <div className="procard-info-price">₹{el.finalPrice}</div>
              </div>
              <div className="procard-btns">
                <button
                  onClick={(el) => addWishlist(el)}
                  data-id={el.id}
                  className="procard-btns-wishlist"
                >
                  <WishList
                    data-id={el.id}
                    className="procard-btns-wishlist-icon"
                  />
                </button>
                <button
                  onClick={(el) => addCart(el)}
                  data-id={el.id}
                  className="procard-btns-cart"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  return (
    <React.Fragment>
      <Header />
      <div className="procard-container">
        {renderProductItems()}
        {/* <div className="procard">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/61NsZ6UrfPL._AC_SY450_.jpg "
            alt="product"
            className="procard-img"
          />
          <div className="procard-bottom">
            <div className="procard-info">
              <div className="procard-info-name">
                AVITA Essential NE14A2INC433-CR 14" (35.56cms)Laptop (Celeron
                N4000/4GB/128GB SSD/Window 10 Home in S Mode/Integrated
                Graphics), Concrete Grey
              </div>
              <div className="procard-info-price">₹17990</div>
            </div>
            <div className="procard-btns">
              <button className="procard-btns-wishlist">
                <WishList className="procard-btns-wishlist-icon" />
              </button>
              <button className="procard-btns-cart">Add to cart</button>
            </div>
          </div>
        </div>
        <div className="procard">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/71tnnbggvrL._AC_SX679_.jpg "
            alt="product"
            className="procard-img"
          />
          <div className="procard-bottom">
            <div className="procard-info">
              <div className="procard-info-name">
                AVITA Essential NE14A2INC433-CR 14" (35.56cms)Laptop (Celeron
                N4000/4GB/128GB SSD/Window 10 Home in S Mode/Integrated
                Graphics), Concrete Grey
              </div>
              <div className="procard-info-price">₹17990</div>
            </div>
            <div className="procard-btns">
              <button className="procard-btns-wishlist">
                <WishList className="procard-btns-wishlist-icon" />
              </button>
              <button className="procard-btns-cart">Add to cart</button>
            </div>
          </div>
        </div>
        <div className="procard">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/719F8WdfBzL._AC_SX355_.jpg "
            alt="product"
            className="procard-img"
          />
          <div className="procard-bottom">
            <div className="procard-info">
              <div className="procard-info-name">
                AVITA Essential NE14A2INC433-CR 14" (35.56cms)Laptop (Celeron
                N4000/4GB/128GB SSD/Window 10 Home in S Mode/Integrated
                Graphics), Concrete Grey
              </div>
              <div className="procard-info-price">₹17990</div>
            </div>
            <div className="procard-btns">
              <button className="procard-btns-wishlist">
                <WishList className="procard-btns-wishlist-icon" />
              </button>
              <button className="procard-btns-cart">Add to cart</button>
            </div>
          </div>
        </div>
        <div className="procard">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/61NsZ6UrfPL._AC_SY450_.jpg "
            alt="product"
            className="procard-img"
          />
          <div className="procard-bottom">
            <div className="procard-info">
              <div className="procard-info-name">
                AVITA Essential NE14A2INC433-CR 14" (35.56cms)Laptop (Celeron
                N4000/4GB/128GB SSD/Window 10 Home in S Mode/Integrated
                Graphics), Concrete Grey
              </div>
              <div className="procard-info-price">₹17990</div>
            </div>
            <div className="procard-btns">
              <button className="procard-btns-wishlist">
                <WishList className="procard-btns-wishlist-icon" />
              </button>
              <button className="procard-btns-cart">Add to cart</button>
            </div>
          </div>
        </div>
        <div className="procard">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/61NsZ6UrfPL._AC_SY450_.jpg "
            alt="product"
            className="procard-img"
          />
          <div className="procard-bottom">
            <div className="procard-info">
              <div className="procard-info-name">
                AVITA Essential NE14A2INC433-CR 14" (35.56cms)Laptop (Celeron
                N4000/4GB/128GB SSD/Window 10 Home in S Mode/Integrated
                Graphics), Concrete Grey
              </div>
              <div className="procard-info-price">₹17990</div>
            </div>
            <div className="procard-btns">
              <button className="procard-btns-wishlist">
                <WishList className="procard-btns-wishlist-icon" />
              </button>
              <button className="procard-btns-cart">Add to cart</button>
            </div>
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { data: state.productCatogery };
};
export default connect(mapStateToProps, { fetchCategoryProducts })(
  SearchResults
);
