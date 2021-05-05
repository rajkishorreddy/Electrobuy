import { useState } from 'react';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as Style } from '../../assets/signup.svg';
import './Signup.scss';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [CnPassword, setCnPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(FirstName, LastName, Email, Password, CnPassword);
  };
  return (
    <div class="signup">
      <div class="signup_left">
        <Link to={'/'} className="signup_left-goback">
          back to home
        </Link>
        <Logo class="signup-logo" />
        <div class="signup-main">
          <form class="signup-form" onSubmit={(e) => onSubmit(e)}>
            <div class="signup-form-title">Create an Account</div>
            <label htmlFor="first-name" class="signup-form-label">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              class="signup-form-input"
              value={FirstName}
              autoComplete="off"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <label htmlFor="last-name" class="signup-form-label">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              class="signup-form-input"
              value={LastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              autoComplete="off"
            />
            <label htmlFor="email" class="signup-form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              class="signup-form-input"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="off"
            />
            <label htmlFor="password" class="signup-form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              class="signup-form-input"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="off"
            />
            <label htmlFor="confirm-pass" class="signup-form-label">
              Confirm Password
            </label>
            <input
              id="confirm-pass"
              type="password"
              class="signup-form-input"
              value={CnPassword}
              onChange={(e) => {
                setCnPassword(e.target.value);
              }}
              autoComplete="off"
            />
            <button class="signup-form-btn">Sign Up</button>
          </form>
          <div class="signup-already">
            If already a user, then{' '}
            <Link class="signup-already-link" to={'/login'}>
              Login here! →
            </Link>
          </div>
        </div>
      </div>
      <div className="signup_right">
        <div className="signup_right-container">
          <div className="signup_right-container-electro">electro</div>
          <Style class="signup_right-container-design" />
          <div className="signup_right-container-buy">buy</div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
