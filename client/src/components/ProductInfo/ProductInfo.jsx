import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'react-simple-snackbar';
import { fetchProductInfo } from '../../actions';

import Header from '../Header';
import Footer from '../Footer';

import loader from '../../assets/loading.gif';
import { ReactComponent as WishlistProdInfo } from '../../assets/wishlistProdInfo.svg';

import './ProductInfo.scss';

const ProductInfo = (props) => {
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
  useEffect(() => {
    props.fetchProductInfo(props.match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();

  const addWishlist = async (el) => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    } else {
      try {
        const data = await axios.post(
          `http://127.0.0.1:8080/api/v1/users/addWishlistProduct/${el.target.parentElement?.dataset?.id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.data.status === 'success') {
          openSnackbar('item added successfully to wishlist');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addCart = async (el) => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    } else {
      try {
        const data = await axios.post(
          `http://127.0.0.1:8080/api/v1/users/addCartProduct/${el.target.dataset?.id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(data);
        if (data.data.status === 'success') {
          openSnackbar('item added successfully to Cart');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const renderInfo = () => {
    if (!props.data.description) {
      return <img className="loading" src={loader} alt="loading.." />;
    } else if (props.data.id !== props.match.params.id)
      return <img className="loading" src={loader} alt="loading.." />;
    else {
      return (
        <div>
          <div className="product-display">
            <div className="product-display-left">
              <Carousel
                className="product-display--carousel"
                showStatus={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={3000}
                showThumbs={false}
                stopOnHover={false}
                swipeable={true}
                useKeyboardArrows={true}
                transitionTime={800}
                showArrows={false}
              >
                {props.data.imageArr.map((el) => {
                  return (
                    <div className="img">
                      <img src={el} alt="img-1" />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div className="product-display--content">
              <div className="product-display--content__heading">
                <h1 className="product-display--content__heading-title">
                  {props.data.fullName}
                </h1>
                <p className="product-display--content__heading-rating">
                  Rating: ★{props.data.averageRating}
                </p>
                <hr className="hr" />
                <div className="product-display--content__heading-priceAndBtn">
                  <div className="product-display--content__heading-priceAndBtn--prices">
                    <p className="mrp">
                      M.R.P: <del>₹ {props.data.originalPrice}</del>
                    </p>
                    <p className="selling">
                      Selling <span>₹ {props.data.finalPrice}</span>
                    </p>
                    <p className="saved">
                      Saved: <span>₹ {props.data.savingPrice}</span>
                    </p>
                  </div>
                  <div className="product-display--content__heading-priceAndBtn--btns">
                    <button
                      onClick={(el) => addWishlist(el)}
                      data-id={props.data.id}
                      className="product-display--content__heading-priceAndBtn--btns-wishlist"
                    >
                      <WishlistProdInfo className="wishlist-icon" />
                    </button>
                    <button
                      onClick={(el) => addCart(el)}
                      data-id={props.data.id}
                      className="product-display--content__heading-priceAndBtn--btns-cart"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className="product-display--content__heading-description">
                  <p>Description:</p>
                  <ul>
                    {props.data.description.map((el) => {
                      return <li>{el}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="product-content">
            <div className="tech-details">
              <h1>Technical Details</h1>
              <hr className="hr" />
              <div className="tech-detials--list">
                {props.data.technicalDetails.map((el) => {
                  return (
                    <div className="tech-details--list__item">
                      <p className="tech-details--list__item-key">
                        {el.detail}
                      </p>
                      <p className="tech-details--list__item-value">
                        {el.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="additional-details">
              <h1>Additional Details</h1>
              <hr className="hr" />
              <div className="additional-details--list">
                {props.data.additionalDetails.map((el) => {
                  return (
                    <div className="tech-details--list__item">
                      <p className="tech-details--list__item-key">
                        {el.detail}
                      </p>
                      <p className="tech-details--list__item-value">
                        {el.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="reviews">
              <h1>Reviews</h1>
              <hr className="hr" />
              <div className="reviews-list">
                {props.data.reviewArr.map((el) => {
                  return (
                    <div className="reviews-item">
                      <div className="reviews-item__top">
                        <h3 className="reviews-item__top--title">{el.title}</h3>
                        <div className="reviews-item__top--subtitle">
                          <p className="reviews-item__top--subtitle-rating">
                            RATING: {el.rating}
                          </p>
                          <p className="reviews-item__top--subtitle-date">
                            {el.createdAt.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                      <p className="reviews-item__comment">{el.description}</p>
                      <div className="reviews-item__customer">
                        <p>- {el.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="info">
      <Header />
      {renderInfo()}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { data: state.productInfo };
};
export default connect(mapStateToProps, { fetchProductInfo })(ProductInfo);
