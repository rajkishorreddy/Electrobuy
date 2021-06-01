import React from "react";
import kishor from "../../assets/kishor.png";
import bhanu from "../../assets/bhanu.png";
import sujay from "../../assets/sujay.png";
import venu from "../../assets/venu.png";
import { ReactComponent as Gmail } from "../../assets/gmail.svg";
import { ReactComponent as Linkedin } from "../../assets/linkedin.svg";
import { ReactComponent as Git } from "../../assets/git.svg";
import "./Devs.scss";
const Devs = () => {
  return (
    <div className="dev">
      <div className="dev-cont">
        <div className="dev-item">
          <img src={kishor} alt="pic" className="dev-item-img-1" />
          <div className="dev-item-right">
            <div className="dev-item-right-name">Kishor</div>
            <div className="dev-item-right-std">Final year student</div>
            <div className="dev-item-right-nav">
              <a
                href="https://github.com/rajkishorreddy"
                className="dev-item-right-nav-item"
              >
                <Git className="dev-item-right-nav-item-icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/Raja-Kishor/"
                className="dev-item-right-nav-item"
              >
                <Linkedin className="dev-item-right-nav-item-icon" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=rajakishorbeeravalli@gmail.com"
                className="dev-item-right-nav-item"
              >
                <Gmail className="dev-item-right-nav-item-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="dev-item">
          <img src={sujay} alt="pic" className="dev-item-img-2" />
          <div className="dev-item-right">
            <div className="dev-item-right-name">Sujay</div>
            <div className="dev-item-right-std">Final year student</div>
            <div className="dev-item-right-nav">
              <a
                href="https://github.com/Sujay99999/"
                className="dev-item-right-nav-item"
              >
                <Git className="dev-item-right-nav-item-icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/sujayjami99999/"
                className="dev-item-right-nav-item"
              >
                <Linkedin className="dev-item-right-nav-item-icon" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=sujayjami99999@gmail.com"
                className="dev-item-right-nav-item"
              >
                <Gmail className="dev-item-right-nav-item-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="dev-item">
          <img src={bhanu} alt="pic" className="dev-item-img-3" />
          <div className="dev-item-right">
            <div className="dev-item-right-name">Bhanu</div>
            <div className="dev-item-right-std">Final year student</div>

            <div className="dev-item-right-nav">
              <a
                href="https://github.com/bhnprksh222"
                className="dev-item-right-nav-item"
              >
                <Git className="dev-item-right-nav-item-icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/bhanu-prakash-akepogu"
                className="dev-item-right-nav-item"
              >
                <Linkedin className="dev-item-right-nav-item-icon" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=bhnprksh222@gmail.com"
                className="dev-item-right-nav-item"
              >
                <Gmail className="dev-item-right-nav-item-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="dev-item">
          <img src={venu} alt="pic" className="dev-item-img-4" />
          <div className="dev-item-right">
            <div className="dev-item-right-name">Venu</div>
            <div className="dev-item-right-std">Final year student</div>

            <div className="dev-item-right-nav">
              <a
                href="https://github.com/venu-42"
                className="dev-item-right-nav-item"
              >
                <Git className="dev-item-right-nav-item-icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/venugopal04"
                className="dev-item-right-nav-item"
              >
                <Linkedin className="dev-item-right-nav-item-icon" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=solipuram42@gmail.com"
                className="dev-item-right-nav-item"
              >
                <Gmail className="dev-item-right-nav-item-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devs;
