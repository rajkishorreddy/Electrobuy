import { useState } from "react";
import "./ForgotPass.scss";
import { useSnackbar } from "react-simple-snackbar";
import axios from "axios";
import history from "../../history";
const ForgotPass = (props) => {
  const [pass, setPass] = useState("");
  const [cnPass, setCnPass] = useState("");
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
      const { data } = await axios.patch(
        `https://electrobuy.herokuapp.com/api/v1/users/basicResetPassword/${props.match.params.token}`,
        {
          password: pass,
          confirmPassword: cnPass,
        }
      );
      if (data.status === "success") {
        openSnackbar("user password is successfully updated !");
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      }
    } catch (err) {
      openSnackbar(err.response?.data?.message);
    }
  };
  return (
    <div className="fp">
      <div className="fp-form-container">
        <form className="signup-form" onSubmit={(e) => onSubmit(e)}>
          <div className="signup-form-title">Update here!</div>

          <label htmlFor="pass" className="signup-form-label">
            New Password
          </label>
          <input
            id="pass"
            type="password"
            className="signup-form-input"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            autoComplete="off"
          />
          <label htmlFor="cnPass" className="signup-form-label">
            Confirm Password
          </label>
          <input
            id="cnpass"
            type="password"
            className="signup-form-input"
            value={cnPass}
            onChange={(e) => {
              setCnPass(e.target.value);
            }}
            autoComplete="off"
          />

          <button className="signup-form-btn margin-btm">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPass;
