<<<<<<< HEAD
import { useState, useEffect } from 'react';
import Resizer from "react-image-file-resizer";
import axios from 'axios';

=======
import { useState, useEffect, useRef } from 'react';
import './Myaccount.scss';
>>>>>>> 6482e465d87c92afa2e64f8d2d098c87d8a8717d
import Header from '../Header.jsx';
import './Myaccount.scss';

import { ReactComponent as Camera } from '../../assets/camera.svg';
import { ReactComponent as Myac } from '../../assets/myac.svg';
import temp from '../../assets/profile.png';
<<<<<<< HEAD
=======
import axios from 'axios';
import FileBase from 'react-file-base64';
import { useSnackbar } from 'react-simple-snackbar';
>>>>>>> 6482e465d87c92afa2e64f8d2d098c87d8a8717d

const Myaccount = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [cnNewPass, setCnNewPass] = useState('');
<<<<<<< HEAD
  const [dp, setDp] = useState('');

=======
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
>>>>>>> 6482e465d87c92afa2e64f8d2d098c87d8a8717d
  useEffect(() => {
    const getData = async () => {
      const token = window.localStorage.getItem('token');
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8080/api/v1/users/getMyProfile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(data.data);
        const [first, last] = data.data.name.split(' ');
        setFirstName(first);
        setLastName(last);
        setEmail(data.data.email);
        setAddress(data.data.address);
      } catch (err) {
        console.log(err.response);
      }
    };
    getData();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('token');
    try {
      const { data } = await axios.patch(
        `http://127.0.0.1:8080/api/v1/users/updateMyProfile`,
        {
          name: `${FirstName} ${LastName}`,
          email: Email,
          address: address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      const [first, last] = data.data.user.name.split(' ');
      setFirstName(first);
      setLastName(last);
<<<<<<< HEAD
      setEmail(data.data.email);
    };
    getData();
  });

  const resizeFile = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          300,
          300,
          "JPEG",
          75,
          0,
          (uri) => {
            // console.log(uri);
            setDp(uri);
            // this.setState({ newImage: uri });
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(dp);
=======
      setEmail(data.data.user.email);
      setAddress(data.data.user.address);
      if (data.status === 'success') {
        openSnackbar('Profile updated successfully');
      }
    } catch (err) {
      openSnackbar(err.response?.data?.message);
    }
  };
  const changePassword = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('token');
    try {
      const { data } = await axios.patch(
        `http://127.0.0.1:8080/api/v1/users/updateMyPassword`,
        {
          currentPassword: currPass,
          password: newPass,
          confirmPassword: cnNewPass,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.status === 'success') {
        openSnackbar('password changed successfully');
      }
    } catch (err) {
      openSnackbar(err.response?.data?.message);
    }
>>>>>>> 6482e465d87c92afa2e64f8d2d098c87d8a8717d
  };
  return (
    <div>
      <Header />
      <div className="myac">
        <div className="myac-img-cont">
          <img src={temp} className="myac-img" alt="select" />
          <button className="myac-img-btn">
<<<<<<< HEAD
            <input
              id="dp"
              accept="image/*"
              className="myac-img-btn__input"
              type="file"
              onChange={resizeFile}
            />
            <label htmlFor="dp" className="myac-img-btn__input-label">
              <Camera />{' '}
            </label>
=======
            {/* <Camera />{' '} */}
            {/* <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setImage(base64)}
            /> */}
>>>>>>> 6482e465d87c92afa2e64f8d2d098c87d8a8717d
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
            <form
              className="myac-form-left"
              onSubmit={(e) => changePassword(e)}
            >
              <div className="myac-form-left-title">Change password</div>
              <label htmlFor="crpass" className="myac-form-left-label">
                Current Password
              </label>
              <input
                id="crpass"
                type="password"
                className="myac-form-left-input"
                value={currPass}
                autoComplete="off"
                onChange={(e) => {
                  setCurrPass(e.target.value);
                }}
              />
              <label htmlFor="newpass" className="myac-form-left-label">
                New Password
              </label>
              <input
                id="newpass"
                type="password"
                className="myac-form-left-input"
                value={newPass}
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
                autoComplete="off"
              />
              <label htmlFor="cnnew" className="myac-form-left-label">
                Confirm new Password
              </label>
              <input
                id="cnnew"
                type="password"
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
        <Myac className="myac-svg" />
        <div className="orders">
          <div className="orders-title">My orders</div>
        </div>
        {/* <div className="choose">
          
        </div> */}
        <input type="file" className="file" />
      </div>
    </div>
  );
};

export default Myaccount;
