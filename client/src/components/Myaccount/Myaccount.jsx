import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "react-simple-snackbar";
import Resizer from "react-image-file-resizer";
import google from "../../assets/google.png";
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";

import "./Myaccount.scss";

import { ReactComponent as Camera } from "../../assets/camera.svg";
import { ReactComponent as Myac } from "../../assets/myac.svg";

import { Link } from "react-router-dom";

const Myaccount = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [cnNewPass, setCnNewPass] = useState("");
  const [orders, setOrders] = useState(null);
  const [dp, setDp] = useState("");
  const [avatar, setAvatar] = useState("");
  const [googleId, setGoogleId] = useState(null);

  console.log(orders);
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
    const getData = async () => {
      const token = window.localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/users/getMyProfile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("my account", data.data.googleId);
        const orders = await axios.get(
          `http://localhost:8080/api/v1/users/orders `,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(orders.data.data);
        const [first, last] = data.data.name.split(" ");
        setFirstName(first);
        setLastName(last);
        setEmail(data.data.email);
        setAddress(data.data.address);
        setAvatar(data.data.avatar);
        setGoogleId(data.data.googleId);
      } catch (err) {
        openSnackbar(err.response?.data?.message);
      }
    };

    getData();
  }, []);

  const resizeFile = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          300,
          300,
          "JPEG",
          75,
          0,
          (uri) => {
            // console.log(uri);
            setDp(uri);
            // this.setState({ newImage: uri });
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const uploadDp = async () => {
      const { data } = await axios.patch(
        `http://localhost:8080/api/v1/users/updateMyProfilePic`,
        {
          avatar: dp,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      setAvatar(data.data.avatar);
    };
    uploadDp();
  }, [dp]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    try {
      const { data } = await axios.patch(
        `http://localhost:8080/api/v1/users/updateMyProfile`,
        {
          name: `${FirstName} ${LastName}`,
          email: Email,
          address: address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      const [first, last] = data.data.user.name.split(" ");
      setFirstName(first);
      setLastName(last);
      setEmail(data.data.user.email);
      setAddress(data.data.user.address);
      if (data.status === "success") {
        openSnackbar("Profile updated successfully");
      }
    } catch (err) {
      openSnackbar(err.response?.data?.message);
    }
  };
  const changePassword = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    try {
      const { data } = await axios.patch(
        `http://localhost:8080/api/v1/users/updateMyPassword`,
        {
          currentPassword: currPass,
          password: newPass,
          confirmPassword: cnNewPass,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.status === "success") {
        openSnackbar("password changed successfully");
      }
    } catch (err) {
      openSnackbar(err.response?.data?.message);
    }
  };
  const renderOrders = () => {
    if (!orders) return <div>Loading...</div>;
    else
      return orders.map((el) => {
        return (
          <div className="oitem" key={el._id}>
            <div className="oitem-id">
              <span className="oitem-id-title">ORDER-ID: </span> {el.orderId}
            </div>
            <div className="oitem-id">
              <span className="oitem-id-title">TRANSACTION-DATE: </span>
              {el.transactionDate.slice(0, 10)}
            </div>
            <div className="oitem-id">
              <span className="oitem-id-title">TRANSACTION-ID: </span>
              {el.transactionId}
            </div>
            <div className="oitem-id">
              <span className="oitem-id-title">AMOUNT:</span> ₹
              {el.transactionAmount}
            </div>
            <div className="oitem-prod-cont">
              {el.products.map((pro) => {
                return (
                  <Link
                    to={`productInfo/${pro.id}`}
                    className="oitem-prod "
                    key={pro.id}
                  >
                    <img
                      src={pro.imageArr[0]}
                      alt="product"
                      className="oitem-prod-img"
                    />
                    <div className="oitem-prod-info">
                      <div className="oitem-prod-info-title">
                        {pro.fullName}
                      </div>
                      <div className="oitem-prod-info-price">
                        ₹{pro.finalPrice}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      });
  };

  return (
    <div>
      <Header />
      <div className="myac">
        <div className="myac-img-cont">
          <img src={avatar} className="myac-img" alt="select" />
          <button className="myac-img-btn">
            <input
              id="dp"
              accept="image/*"
              className="myac-img-btn__input"
              type="file"
              onChange={resizeFile}
            />
            <label htmlFor="dp" className="myac-img-btn__input-label">
              <Camera />{" "}
            </label>
          </button>
        </div>
        <div className="myac-line"></div>
        <div className="myac-forms">
          <div className="myac-forms-left">
            <form className="myac-form-left" onSubmit={(e) => onSubmit(e)}>
              <div className="myac-form-left-title">Profile</div>
              <label htmlFor="first-name" className="myac-form-left-label">
                First Name
              </label>
              <input
                required
                id="first-name"
                type="text"
                className="myac-form-left-input"
                value={FirstName}
                autoComplete="off"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <label htmlFor="last-name" className="myac-form-left-label">
                Last Name
              </label>
              <input
                required
                id="last-name"
                type="text"
                className="myac-form-left-input"
                value={LastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                autoComplete="off"
              />
              <label htmlFor="email" className="myac-form-left-label">
                Email
              </label>
              <input
                required
                id="email"
                type="email"
                className="myac-form-left-input"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="off"
              />
              <label htmlFor="add" className="myac-form-left-label">
                Address
              </label>
              <textarea
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                id="add"
                name="add"
                rows="4"
                cols="50"
                className="myac-form-left-input-add"
              >
                At w3schools.com you will learn how to make a website. They
                offer free tutorials in all web development technologies.
              </textarea>
              <button className="myac-form-left-btn">Update profile</button>
            </form>
          </div>
          <div className="myac-forms-right">
            <form
              className="myac-form-left"
              onSubmit={(e) => changePassword(e)}
            >
              <div className="myac-form-left-title">Change password</div>
              <label htmlFor="crpass" className="myac-form-left-label">
                Current Password
              </label>
              <input
                id="crpass"
                type="password"
                className="myac-form-left-input"
                value={currPass}
                autoComplete="off"
                onChange={(e) => {
                  setCurrPass(e.target.value);
                }}
              />
              <label htmlFor="newpass" className="myac-form-left-label">
                New Password
              </label>
              <input
                id="newpass"
                type="password"
                className="myac-form-left-input"
                value={newPass}
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
                autoComplete="off"
              />
              <label htmlFor="cnnew" className="myac-form-left-label">
                Confirm new Password
              </label>
              <input
                id="cnnew"
                type="password"
                className="myac-form-left-input"
                value={cnNewPass}
                onChange={(e) => {
                  setCnNewPass(e.target.value);
                }}
                autoComplete="off"
              />
              <button className="myac-form-left-btn">change password</button>
              {!googleId ? (
                <a
                  className="googlec"
                  href={`http://localhost:8080/api/v1/users/connect/google/${window.localStorage.getItem(
                    "token"
                  )}`}
                >
                  <div className="googlec-img-cont">
                    <img
                      src={google}
                      alt="google"
                      className="googlec-img"
                    ></img>
                  </div>
                  <div className="googlec-name">connect with google</div>
                </a>
              ) : null}
            </form>
          </div>
        </div>
        <Myac className="myac-svg" />
        <div className="orders">
          <div className="orders-title">My orders</div>
          {orders?.length === 0 ? (
            <div className="orders-null">
              You haven't ordered anything yet! Start shopping!
            </div>
          ) : (
            <div className="orders-items">{renderOrders()}</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Myaccount;
