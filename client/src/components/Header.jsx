import { useState } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
import { useSnackbar } from 'react-simple-snackbar';
// import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import './header.scss';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import { ReactComponent as SearchIcon } from '../assets/searchIcon.svg';
import { ReactComponent as WishList } from '../assets/wishlist.svg';
import { ReactComponent as Cart } from '../assets/cart.svg';
import { ReactComponent as Down } from '../assets/downarrow.svg';

import axios from 'axios';
const Header = () => {
  const [term, setTerm] = useState('');
  const [visible, setVisible] = useState(false);

  const [user, setUser] = useState(window.localStorage.getItem('token'));
  const [searchResults, setSearchResults] = useState([]);
  const [timeout, settimeout1] = useState(undefined);
  const options = {
    position: 'top-left',
    style: {
      // backgroundColor: '#930696',
      background: 'linear-gradient(180deg, #5e3173 0.31%, #000000 102.17%)',
      color: 'white',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '16px',
      textAlign: 'center',
    },
    closeStyle: {
      color: 'black',
      fontSize: '10px',
    },
  };
  const [openSnackbar] = useSnackbar(options);
  // const listRef = useRef(null);
  const logout = () => {
    window.localStorage.removeItem('token');
    setUser(window.localStorage.getItem('token'));
    openSnackbar('Successfully logged-out');
    history.push('/');
  };
  const googletry = async () => {
    await axios.get('http://127.0.0.1:8080/api/v1/users/google');
  };
  const SearchSubmit = async (e) => {
    e.preventDefault();
    let value;
    if (e.target.nodeName === 'INPUT') {
      value = e.target.value;
    } else {
      value = term;
    }
    if (value === '') {
      setSearchResults([]);
      return;
    }
    // console.log(timeout,value);

    if (timeout) {
      clearTimeout(timeout);
    }
    let timeout1 = setTimeout(async () => {
      try {
        const res = await axios.post(
          'http://127.0.0.1:8080/api/v1/products/searchText',
          {
            searchText: value,
          }
        );
        setSearchResults(res.data.searchResults);
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    }, 500);
    settimeout1(timeout1);
  };

  const onEnter = (e) => {
    e.preventDefault();
    if (searchResults.length)
      history.push(`/productInfo/${searchResults[0]._id}`);
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
          <div className="header_form_container">
            <form onSubmit={onEnter} className="header_form">
              <input
                value={term}
                onBlur={() => {
                  setTimeout(() => {
                    setVisible(false);
                  }, 500);
                  // listRef.current.style.visibility = 'hidden';
                }}
                onFocus={() => {
                  setVisible(true);
                  // listRef.current.style.visibility = 'visible';
                }}
                type="text"
                className="header_form-input"
                placeholder="search here..."
                onChange={(e) => {
                  setTerm(e.target.value);
                  SearchSubmit(e);
                }}
              />
              <button className="header_form-btn">
                <SearchIcon className="header_form-btn-img" />
              </button>
            </form>
            {searchResults.length ? (
              <div
                className={
                  visible
                    ? 'header_form_searchlist'
                    : 'header_form_searchlist hidden'
                }
                //   classnames({
                //     "header_form_searchlist": true,
                //     'visible': visible,
                //     'hidden': !visible
                //   }
                // )
                // ref={listRef}
                // style={{
                //   visibility: `${searchResults.length ? 'visible' : 'hidden'}`,
                // }}
              >
                {searchResults.map((result) => {
                  return (
                    <Link
                      to={`/productInfo/${result._id}`}
                      className="header_form_searchlist_item"
                      key={result._id}
                    >
                      {result.fullName}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
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
            <div className="disp-flex">
              <Link to={'/myaccount'} className="header_login">
                Myaccount
              </Link>
              <button onClick={() => logout()} className="header_login">
                logout
              </button>
            </div>
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
        <button onClick={googletry}>google</button>
        {/* <div className="nav_more"> */}
        <div className="nav_more-btn">
          <span className="nav_more-btn-span">
            MORE <Down className="nav_more-btn-down" />
          </span>
          <div className="nav_more-list">
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
          </div>
        </div>
        {/* </div> */}
      </nav>
    </div>
  );
};

export default Header;
