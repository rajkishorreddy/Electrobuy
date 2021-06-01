import React from "react";
import kishor from "../../assets/kishor.png";
import bhanu from "../../assets/bhanu.png";
import sujay from "../../assets/sujay.png";
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
            <div className="dev-item-right-name">Raj Kishor</div>
            <div className="dev-item-right-nav">
              <a href="/" className="dev-item-right-nav-item">
                <Git className="dev-item-right-nav-item-icon" />
              </a>
              <a href="/" className="dev-item-right-nav-item">
                <Linkedin className="dev-item-right-nav-item-icon" />
              </a>
              <a href="/" className="dev-item-right-nav-item">
                <Gmail className="dev-item-right-nav-item-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="dev-item">
          <img src={sujay} alt="pic" className="dev-item-img-2" />
          <div className="dev-item-right">
            <div className="dev-item-right-name">Sujay</div>
            <div className="dev-item-right-nav">
              <a href="/" className="dev-item-right-nav-item">
                <Git className="dev-item-right-nav-item-icon" />
              </a>
              <a href="/" className="dev-item-right-nav-item">
                <Linkedin className="dev-item-right-nav-item-icon" />
              </a>
              <a href="/" className="dev-item-right-nav-item">
                <Gmail className="dev-item-right-nav-item-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="dev-item">
          <img src={bhanu} alt="pic" className="dev-item-img-3" />
          <div className="dev-item-right">
            <div className="dev-item-right-name">Bhanu Prakash</div>
            <div className="dev-item-right-nav">
              <a href="/" className="dev-item-right-nav-item">
                <Git className="dev-item-right-nav-item-icon" />
              </a>
              <a href="/" className="dev-item-right-nav-item">
                <Linkedin className="dev-item-right-nav-item-icon" />
              </a>
              <a href="/" className="dev-item-right-nav-item">
                <Gmail className="dev-item-right-nav-item-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="dev-item">
          <img src={kishor} alt="pic" className="dev-item-img-1" />
          <div className="dev-item-right">
            <div className="dev-item-right-name">Venu</div>
            <div className="dev-item-right-nav">
              <a href="/" className="dev-item-right-nav-item">
                <Git className="dev-item-right-nav-item-icon" />
              </a>
              <a href="/" className="dev-item-right-nav-item">
                <Linkedin className="dev-item-right-nav-item-icon" />
              </a>
              <a href="/" className="dev-item-right-nav-item">
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
