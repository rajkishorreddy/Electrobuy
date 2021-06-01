import "./footer.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Payment } from "../assets/Payments.svg";
import { ReactComponent as Logo } from "../assets/Logo.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <Logo />
      </div>
      <div className="footer-content">
        <Payment className="footer-content__payments" />
        <Link to={"/devs"} className="footer-content-devs">
          developed with 💙 by <span>devs</span> →
        </Link>
      </div>
    </div>
  );
};
export default Footer;
