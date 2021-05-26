import { useState, useEffect } from 'react';
import './Myaccount.scss';
import Header from '../Header.jsx';
import { ReactComponent as Camera } from '../../assets/camera.svg';
import temp from '../../assets/profile.png';
import axios from 'axios';
const Myaccount = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [cnNewPass, setCnNewPass] = useState('');

  useEffect(() => {
    const getData = async () => {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.get(
        `http://127.0.0.1:8080/api/v1/users/getMyProfile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data.data);
      const [first, last] = data.data.name.split(' ');
      setFirstName(first);
      setLastName(last);
      setEmail(data.data.email);
    };
    getData();
  });
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Header />
      <div className="myac">
        <div className="myac-img-cont">
          <img src={temp} className="myac-img" alt="select" />
          <button className="myac-img-btn">
            <Camera />{' '}
          </button>
        </div>
        <div className="myac-line"></div>
        <div className="myac-forms">
          <div className="myac-forms-left">
            <form className="myac-form-left" onSubmit={(e) => onSubmit(e)}>
              <div className="myac-form-left-title">Profile</div>
              <label htmlFor="first-name" className="myac-form-left-label">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                className="myac-form-left-input"
                value={FirstName}
                autoComplete="off"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <label htmlFor="last-name" className="myac-form-left-label">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                className="myac-form-left-input"
                value={LastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                autoComplete="off"
              />
              <label htmlFor="email" className="myac-form-left-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="myac-form-left-input"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="off"
              />
              <label htmlFor="add" className="myac-form-left-label">
                Address
              </label>
              <input
                id="add"
                type="text"
                className="myac-form-left-input-add"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                autoComplete="off"
              />
              <button className="myac-form-left-btn">Update profile</button>
            </form>
          </div>
          <div className="myac-forms-right">
            <form className="myac-form-left" onSubmit={(e) => onSubmit(e)}>
              <div className="myac-form-left-title">Change password</div>
              <label htmlFor="first-name" className="myac-form-left-label">
                Current Password
              </label>
              <input
                id="first-name"
                type="text"
                className="myac-form-left-input"
                value={currPass}
                autoComplete="off"
                onChange={(e) => {
                  setCurrPass(e.target.value);
                }}
              />
              <label htmlFor="last-name" className="myac-form-left-label">
                New Password
              </label>
              <input
                id="last-name"
                type="text"
                className="myac-form-left-input"
                value={newPass}
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
                autoComplete="off"
              />
              <label htmlFor="email" className="myac-form-left-label">
                Confirm new Password
              </label>
              <input
                id="email"
                type="email"
                className="myac-form-left-input"
                value={cnNewPass}
                onChange={(e) => {
                  setCnNewPass(e.target.value);
                }}
                autoComplete="off"
              />
              <button className="myac-form-left-btn">change password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myaccount;
