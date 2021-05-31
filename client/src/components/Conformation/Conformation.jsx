/* eslint-disable jsx-a11y/no-distracting-elements */
import { useEffect, useState } from "react";
import axios from "axios";

import "./Conformation.scss";
import success from "../../assets/success.gif";
import cancel from "../../assets/cancel.gif";

import Truck from "../../assets/Truck.svg";
import Line from "../../assets/Line.svg";
import Tire from "../../assets/Tire.png";

import Header from "../Header";

const Conformation = (props) => {
  const [transaction, setTransaction] = useState({});
  const [status, setStatus] = useState('cancel');

  useEffect(() => {
    const check = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/payments/checkOrder/${props.match.params.id}`
        );
        console.log(data);
        // eslint-disable-next-line no-unused-expressions
        data?.message === 'success' ? setStatus('success') : null
        setTransaction(data.data);
      } catch (err) {
        console.log(err.response?.data);
      }
    };

    check();
  }, []);
  return (
    // <div>{props.match.params.id}</div>
    <div>
      <Header />
      <div className="confirmation">
        <div className="confirmation-success">
          {status === 'success' ? <img src={success} alt="success" /> : <img src={cancel} alt="cancel" />}
        </div>
        {status === 'success' ? (<div className="confirmation-content">
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
        </div>) : (
          <div className="error">
            <h4>Transaction is failed ❌, due to any of the below reasons: </h4>
            <div>
                <p>1. User may cancelled the payment</p>
                <p>2. The bank is unwilling to accept the transaction</p>
                <p>3. Account did not have sufficient funds to cover the transaction amount.</p>
                <p>4. The attempted transaction exceeds the withdrawal limit of the account.</p>
                <p>5. Card is expired. The customer will need to use a different card.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conformation;
