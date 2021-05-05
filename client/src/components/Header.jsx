import { useState } from 'react';
import { Link } from 'react-router-dom';

// import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import './header.scss';

import { ReactComponent as Logo } from '../assets/Logo.svg';
import { ReactComponent as SearchIcon } from '../assets/searchIcon.svg';
import { ReactComponent as WishList } from '../assets/wishlist.svg';
import { ReactComponent as Cart } from '../assets/cart.svg';

const Header = () => {
  const [term, setTerm] = useState('');
  return (
    <div>
      <div className="header">
        <Logo className="header_logo" />
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
              <SearchIcon className="header_form-btn-img" />
            </button>
          </form>
          <button className="header_wishlist">
            <WishList className="header_wishlist-img" />
            {/* <FavoriteRoundedIcon 
              classes={{
                root: "header_wishlist-img",
              }}
            /> */}
            <span className="header_wishlist-name">wishlist</span>
          </button>
          <button className="header_cart">
            <Cart className="header_cart-img" />
            <span className="header_cart-name">cart</span>
          </button>
          <Link to={'/login'} className="header_login">
            login
          </Link>
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
