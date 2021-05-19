import { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './wishlist.scss';
import axios from 'axios';
import history from '../../history';
import loader from '../../assets/loading.gif';
const Wishlist = () => {
  const [arr, setArr] = useState(null);
  useEffect(() => {
    const getdata = async () => {
      const token = window.localStorage.getItem('token');
      if (!token) {
        history.push('/login');
      } else {
        try {
          const { data } = await axios.get(
            `http://127.0.0.1:8080/api/v1/users/getAllWishlistProduct`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setArr(data.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getdata();
  }, []);
  const removeitem = async (el) => {
    const token = window.localStorage.getItem('token');
    try {
      const { data } = await axios.delete(
        `http://127.0.0.1:8080/api/v1/users/addWishlistProduct/${el.target?.dataset?.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data.data);
      setArr(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const renderWishlist = () => {
    if (!arr) return <img className="loading" src={loader} alt="loading.." />;
    else if (arr.length === 0) {
      return (
        <div className="NO_ITEMS">No items in your wishlist.Start Adding!!</div>
      );
    } else {
      return arr.map((el) => {
        return (
          <div key={el.id} className="wishlist_cont-item">
            <img
              src={el.imageArr[0]}
              className="wishlist_cont-item-img"
              alt="product"
            />
            <div className="wishlist_cont-item-info">
              <div className="wishlist_cont-item-title">{el.fullName}</div>
              <div className="wishlist_cont-item-price">
                Price :{' '}
                <span className="wishlist_cont-item-price-get">
                  {' '}
                  ₹{el.finalPrice}
                </span>{' '}
                /
                <span className="wishlist_cont-item-price-original">
                  {' '}
                  ₹{el.originalPrice}
                </span>
              </div>
              <div className="wishlist_cont-item-btns">
                <button
                  data-id={el.id}
                  onClick={(el) => removeitem(el)}
                  className="wishlist_cont-item-remove"
                >
                  Remove
                </button>
                <button className="wishlist_cont-item-move">
                  Move to cart
                </button>
              </div>
              <div className="wishlist_cont-item-rating">
                {' '}
                <span className="wishlist_cont-item-rating-none"></span>★
                {el.averageRating}
              </div>
            </div>
          </div>
        );
      });
    }
  };
  return (
    <div>
      <Header />
      <div className="wishlist">
        <div className="wishlist-heading">
          My Wishlist{' '}
          <span className="wishlist-heading-count">{arr?.length} items</span>
        </div>
        <div className="wishlist_cont">{renderWishlist()}</div>
      </div>
      <Footer />
    </div>
  );
};
export default Wishlist;
