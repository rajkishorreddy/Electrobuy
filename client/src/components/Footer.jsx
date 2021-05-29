import './footer.scss';

import { ReactComponent as Payment } from '../assets/Payments.svg';
import { ReactComponent as Logo } from '../assets/Logo.svg';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <Logo />
      </div>
      <div className="footer-content">
        <Payment className="footer-content__payments" />
        <p>developed with 💙 by <span className="footer-content-devs">devs</span> →</p>
      </div>
    </div>
  );
};
export default Footer;
