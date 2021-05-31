import { useEffect, useState } from "react";
import "./ForgotPass.scss";
const ForgotPass = () => {
  const [pass, setPass] = useState("");
  const [cnPass, setCnPass] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(pass, cnPass);
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
