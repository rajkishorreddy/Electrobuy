import { useState } from 'react';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as Style } from '../../assets/signup.svg';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(Email, Password);
  };
  return (
    <div class="signup">
      <div class="signup_left">
        <Link to={'/'} className="signup_left-goback">
          back to home
        </Link>
        <Logo
          style={{ transform: 'translate(-50%,8rem)' }}
          class="signup-logo"
        />
        <div class="signup-main">
          <form class="signup-form" onSubmit={(e) => onSubmit(e)}>
            <div class="signup-form-title">Login here!</div>

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

            <button class="signup-form-btn">Log in</button>
          </form>
          <div class="signup-already">
            No account, then click here to{' '}
            <Link to={'/signup'} class="signup-already-link">
              sign up! →
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
