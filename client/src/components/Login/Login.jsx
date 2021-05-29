import { useState } from "react";
import { useSnackbar } from "react-simple-snackbar";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as Style } from "../../assets/signup.svg";
import { Link } from "react-router-dom";
import history from "../../history";
import axios from "axios";
const Signup = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
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
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "http://127.0.0.1:8080/api/v1/users/login-basic",
        data: {
          email: Email,
          password: Password,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        credentials: "include",
        // withCredentials: true,
      });
      console.log(data.data);
      window.localStorage.setItem("token", data.jwtToken);
      openSnackbar("Login successfull!");
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } catch (err) {
      console.log(err.response?.data);
      openSnackbar(err.response?.data.message);
    }
  };
  return (
    <div className="signup">
      <div className="signup_left">
        <Link to={"/"} className="signup_left-goback">
          ←
        </Link>
        <Logo
          style={{ transform: "translate(-50%,8rem)" }}
          className="signup-logo"
        />
        <div className="signup-main">
          <form className="signup-form" onSubmit={(e) => onSubmit(e)}>
            <div className="signup-form-title">Login here!</div>

            <label htmlFor="email" className="signup-form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="signup-form-input"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="off"
            />
            <label htmlFor="password" className="signup-form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="signup-form-input"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="off"
            />

            <button className="signup-form-btn">Log in</button>
          </form>
          <div className="signup-already">
            No account, then click here to{" "}
            <Link to={"/signup"} className="signup-already-link">
              sign up! →
            </Link>
          </div>
        </div>
      </div>
      <div className="signup_right">
        <div className="signup_right-container">
          <div className="signup_right-container-electro">electro</div>
          <Style className="signup_right-container-design" />
          <div className="signup_right-container-buy">buy</div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
