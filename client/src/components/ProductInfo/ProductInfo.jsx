import { Carousel } from 'react-responsive-carousel';

import Header from '../Header';
import './ProductInfo.scss';

import img1 from '../../assets/cameras/camera1.jpg';
import img2 from '../../assets/cameras/camera2.jpg';
import img3 from '../../assets/cameras/camera3.jpg';

const ProductInfo = () => {
  return (
    <>
      <Header />
      <div className='info'>
        <div className='product-display'>
          <div className='product-display-left'>
            <Carousel
              className="product-display--carousel"
              showStatus={false}
              autoPlay={true}
              infiniteLoop={true}
              interval={10000}
              showThumbs={false}
              stopOnHover={false}
              swipeable={true}
              useKeyboardArrows={true}
              transitionTime={800}
              showArrows={false}
            >
              <div className='img'><img  src='https://images-na.ssl-images-amazon.com/images/I/719F8WdfBzL._SX679_.jpg' alt='img-1' /></div>
              <div className='img'><img  src={img2} alt='img-2' /></div>
              <div className='img'><img  src={img3} alt='img-3' /></div>
            </Carousel>
          </div>
          <div className='product-display--content'>
            <div className='product-display--content__heading'>
              <h1 className='product-display--content__heading-title'>
              HP 15 Entry Level 15.6-inch (39.62 cms) HD Laptop (AMD 3020e/4GB/1TB HDD/Windows 10 Home/Jet Black/1.74 Kg), 15s-gy0003AU
              </h1>
              <p className='product-display--content__heading-rating'>Rating: ★4.2</p>
              <hr className='hr' />
              <div className='product-display--content__heading-prices'>
                <p className='mrp'>M.R.P:	<del>₹ 2490.00</del></p>
                <p className='selling'>Selling <span>₹ 599</span></p>
                <p className='saved'>Saved: <span>₹ 1891</span></p>
              </div>
              <div className='product-display--content__heading-description'>
                <p>Description:</p>
                <ul>
                  <li>Has a PVC cable which is durable and tangle free.</li>
                  <li>Compatibility and Connectivity: Compatible with Android/iOS and connectivity via 3.5mm AUX cable.</li>
                  <li>IPX Rating: NA, Rated Power : 3mW.</li>
                  <li>Active Noise Cancellation: NA.</li>
                  <li>Mic: In line Mic.</li>
                  <li>Other Inclusions: Additional earbuds, Warranty Card.</li>
                  <li>1 year warranty from the date of purchase, you can activate your warranty by giving a missed call on 9223032222.</li>
                  <li>Alternatively you can claim your warranty, support.boat-lifestyle.com, +912249461882 or info@imaginemarketingindia.com.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      <div style={{ height: '100vh' }}>
      </div>
        test
      </div>
    </>
  )
}

export default ProductInfo
