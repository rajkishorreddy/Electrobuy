import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
// import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import './header.scss';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import { ReactComponent as SearchIcon } from '../assets/searchIcon.svg';
import { ReactComponent as WishList } from '../assets/wishlist.svg';
import { ReactComponent as Cart } from '../assets/cart.svg';
import { ReactComponent as Down } from '../assets/downarrow.svg';
const Header = () => {
  const [term, setTerm] = useState('');
  const [user, setUser] = useState(window.localStorage.getItem('token'));
  const more = useRef();
  const logout = () => {
    window.localStorage.removeItem('token');
    setUser(window.localStorage.getItem('token'));
    history.push('/');
  };
  const buttonhover = () => {
    more.classList.add('active');
  };
  return (
    <div>
      <div className="header">
        <Link to={'/'} className="Link">
          {' '}
          <Logo className="header_logo" />
        </Link>
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
          <Link to={'/wishlist'} className="header_wishlist">
            <WishList className="header_wishlist-img" />
            {/* <FavoriteRoundedIcon 
              classes={{
                root: "header_wishlist-img",
              }}
            /> */}
            <span className="header_wishlist-name">wishlist</span>
          </Link>
          <Link to={'/cart'} className="header_cart">
            <Cart className="header_cart-img" />
            <span className="header_cart-name">cart</span>
          </Link>
          {user ? (
            <button onClick={() => logout()} className="header_login">
              logout
            </button>
          ) : (
            <Link to={'/login'} className="header_login">
              login
            </Link>
          )}
        </div>
      </div>
      <nav className="nav">
        <Link to={'/results/laptops'} className="nav_item">
          LAPTOPS
        </Link>
        <Link to={'/results/televisions'} className="nav_item">
          TVS
        </Link>
        <Link to={'/results/DSLR'} className="nav_item">
          CAMERAS
        </Link>
        <Link to={'/results/headphones'} className="nav_item">
          HEADPHONES
        </Link>
        {/* <div className="nav_more"> */}
        <div className="nav_more-btn">
          <span className="nav_more-btn-span">
            MORE <Down className="nav_more-btn-down" />
          </span>
          <ui className="nav_more-list">
            <Link to={'/results/speakers'} className="nav_more_item">
              SPEAKERS
            </Link>
            <Link to={'/results/mobiles'} className="nav_more_item">
              MOBILES
            </Link>
            <Link to={'/results/smartWatches'} className="nav_more_item">
              SMART WATCHES
            </Link>
            <Link to={'/results/AC'} className="nav_more_item">
              AC
            </Link>
            <Link to={'/results/cameras'} className="nav_more_item">
              CAMERA ACCESSORIES
            </Link>
            <Link to={'/results/refrigerators'} className="nav_more_item">
              REFRIGERATORS
            </Link>
          </ui>
        </div>
        {/* </div> */}
      </nav>
    </div>
  );
};

export default Header;
