/* eslint-disable jsx-a11y/no-distracting-elements */
import { useEffect, useState } from "react";
import axios from "axios";

import "./Conformation.scss";
import success from "../../assets/success.gif";

import Truck from "../../assets/Truck.svg";
import Line from "../../assets/Line.svg";
import Tire from "../../assets/Tire.png";

import Header from "../Header";

const Conformation = (props) => {
  const [transaction, setTransaction] = useState({});
  useEffect(() => {
    const check = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/payments/checkOrder/${props.match.params.id}`
        );
        console.log(data);
        setTransaction(data.data);
      } catch (err) {
        console.log(err.response?.data);
      }
    };
    //!REF
    // {message: "success", data: {…}}data: id: "60b4741c9926e0048ec66aee"orderId: "8f18aad9-8497-4432-8fe3-6cae6f0d5947"products: [{…}]transactionAmount: 519990transactionDate: "2021-05-31T05:28:41.000Z"transactionId: "20210531111212800110168399202660059"userRef: "60b473ec9926e0048ec66aeb"__v: 0_id: "60b4741c9926e0048ec66aee"__proto__: Objectmessage: "success"__proto__: Object
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
  }, []);
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
              <span>Order ID:</span> {transaction.orderId}
            </p>
            <p className="confirmation-content__container-order">
              <span>Transaction Amount:</span> ₹ {transaction.transactionAmount}
            </p>
            <p className="confirmation-content__container-order">
              <span>Transaction ID: </span> {transaction.transactionId}
            </p>
            <p className="confirmation-content__container-order">
              <span>No of Products:</span> {transaction.products?.length}
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
