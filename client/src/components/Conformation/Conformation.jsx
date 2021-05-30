/* eslint-disable jsx-a11y/no-distracting-elements */
import { useEffect } from "react";
import axios from "axios";

import "./Conformation.scss";
import success from "../../assets/success.gif";

import Truck from "../../assets/Truck.svg";
import Line from "../../assets/Line.svg";
import Tire from "../../assets/Tire.png";

import Header from "../Header";
import Footer from "../Footer";

const Conformation = (props) => {
  useEffect(() => {
    const check = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/payments/checkOrder/${props.match.params.id}`
        );
        console.log(data);
      } catch (err) {
        console.log(err.response?.data);
      }
    };
    // try {
    //   const check = async () => {
    //     const { data } = await axios.get(
    //       `http://localhost:8080/api/v1/payments/checkOrder/${props.match.params.id}`
    //     );
    //     console.log(data);
    //   };

    // } catch (err) {
    //   console.log(err.response?.data);
    //   alert(err.response?.data.message);
    // }
    check();
  });
  return (
    // <div>{props.match.params.id}</div>
    <div>
      <Header />
      <div className="confirmation">
        <div className="confirmation-success">
          <img src={success} alt="success" />
        </div>
        <div className="confirmation-content">
          <div className="confirmation-content__container">
            <p className="confirmation-content__container-order">
              <span>Order ID:</span> 33654156561232
            </p>
            <p className="confirmation-content__container-order">
              <span>Transaction Amount:</span> ₹ 3365
            </p>
            <p className="confirmation-content__container-order">
              <span>Transaction ID: </span> 33654156561232
            </p>
            <p className="confirmation-content__container-order">
              <span>No of Products:</span> 3
            </p>
          </div>
          <div className="animation">
            <div className="vehicle">
              <img className="truck" src={Truck} alt="truck" />
              <div>
                <img className="tire" src={Tire} alt="tire" />
                <img className="tire" src={Tire} alt="tire" />
              </div>
            </div>
            <div className="tech-slideshow">
              <div className="mover-1">
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
                <img className="line" src={Line} alt="line" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Conformation;
