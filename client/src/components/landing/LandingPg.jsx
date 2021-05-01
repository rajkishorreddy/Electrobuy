import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Header from '../Header';
import './landingPg.scss';
import slide1 from '../../assets/slide1.png';
import slide2 from '../../assets/slide2.png';
import slide3 from '../../assets/slide3.png';
const LandingPg = () => {
  return (
    <div>
      <Header />
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={2500}
        showThumbs={false}
        stopOnHover={false}
        swipeable={true}
        useKeyboardArrows={true}
        transitionTime={800}
        showArrows={false}
      >
        <div className="slide">
          <img src={slide1} alt="slide1" className="slide_img" />
          <div className="slide_shade"></div>
          <div className="slide_text">
            we <br /> provide
            <br /> quality
            <br />
            products
          </div>
        </div>

        <div className="slide">
          <img src={slide2} alt="slide2" className="slide_img" />
          <div className="slide_shade"></div>
          <div className="slide_text">
            Hassel <br /> free
            <br /> shopping
            <br />
            experience
          </div>
        </div>
        <div className="slide">
          <img src={slide3} alt="slide2" className="slide_img" />
          <div className="slide_shade"></div>
          {/* <div className="slide_text">
            you <br /> are in
            <br /> best place
          </div> */}
        </div>
      </Carousel>
      <div className="cards"></div>
    </div>
  );
};

export default LandingPg;
