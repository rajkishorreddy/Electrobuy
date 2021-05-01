import { useState } from 'react';
import './header.scss';
import logo from '../assets/Logo.svg';
import search from '../assets/searchIcon.svg';
import wishlist from '../assets/wishlist.svg';
import cart from '../assets/cart.svg';
import { Link } from 'react-router-dom';
const Header = () => {
  const [term, setTerm] = useState('');
  return (
    <div>
      <div className="header">
        <img src={logo} className="header_logo" alt="company logo" />
        <div className="flex header_right">
          {' '}
          <form className="header_form">
            <input
              value={term}
              type="text"
              className="header_form-input"
              placeholder="search here..."
              onChange={(e) => setTerm(e.target.value)}
            />
            <button className="header_form-btn">
              <img src={search} className="header_form-btn-img" alt={search} />
            </button>
          </form>
          <button className="header_wishlist">
            <img
              src={wishlist}
              className="header_wishlist-img"
              alt={wishlist}
            />
            <span className="header_wishlist-name">wishlist</span>
          </button>
          <button className="header_cart">
            <img src={cart} className="header_cart-img" alt={wishlist} />
            <span className="header_cart-name">cart</span>
          </button>
          <button className="header_login">login</button>
        </div>
      </div>
      <nav className="nav">
        <Link to={'/'} className="nav_item">
          LAPTOPS
        </Link>
        <Link to={'/'} className="nav_item">
          MOBILES
        </Link>
        <Link to={'/'} className="nav_item">
          CAMERAS
        </Link>
        <Link to={'/'} className="nav_item">
          HEADPHONES & SOUND SYSTEMS
        </Link>
        <Link to={'/'} className="nav_item">
          TVS
        </Link>
      </nav>
    </div>
  );
};
export default Header;
