import React, { useState } from 'react';
import { register, signin } from '../../../apiCalls/loginCalls';
import { authenticate } from '../../../helpers/loginHelp';
import './login.css';
import logo from './logo.png';

function Login(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { email, password };
    signin(user).then((data) => {
      if (data) {
        if (data.msg) {
          setError(data.msg);
          console.log(error);
        } else if (data.token) {
          authenticate(data, () => {
            console.log('edirecting');
            if (data.user.isAdmin) {
              setRedirect('admin');
            } else {
              setRedirect('user');
            }
          });
        }
      } else {
        setError('Unable to Connect to Database')
      }
    });
  };

  if (redirect) {
    return <Redirect to={`/${redirect}`} />;
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    const user = { name, email, password };
    register(user).then((data) => {
      if (data) {
        console.log(data);
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          setMessage('User added. Login');
        }
      }
    })
  }
  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <img src={logo} alt="dan logo" className="logo-img" />
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log" />
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <form className="section text-center" onSubmit={handleLogin} noValidate>
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <div className="form-group">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="logemail1"
                            autoFocus
                            required
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-at" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            id="logpass1"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-lock-alt" />
                        </div>
                        {error &&
                          <p className="mt-3">
                            <span style={{ color: 'red' }}>{error}</span>
                          </p>
                        }
                        <button className="btn mt-4">submit</button>
                        <p className="mb-0 mt-4 text-center">
                          <a href="#0" className="link">
                            Forgot your password?
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <form className="section text-center" onSubmit={handleSignup}>
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="logname"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-style"
                            placeholder="Your Full Name"
                            id="logname"
                            required
                            autoFocus
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-user" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="logemail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="form-style"
                            placeholder="Your Email"
                            id="logemail2"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-at" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            id="logpass2"
                            autoComplete="off"
                          />
                          <i className="input-icon uil uil-lock-alt" />
                        </div>
                        {error &&
                          <p className="mt-3">
                            <span style={{ color: 'red' }}>{error}</span>
                          </p>
                        }
                        {message &&
                          <p className="mt-3">
                            <span style={{ color: 'green' }}>{message}</span>
                          </p>
                        }
                        <button className="btn mt-4">submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
