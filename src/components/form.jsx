import React from 'react';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const LoginForm = ({ email, setEmail, password, setPassword, ChatIcon, Login, loading }) => {
  return (
    <div className='login-form-container'>
      <div className="container">
        <div className="white-card-container">
          <form>
            <p className="login-head">Login</p>
            <input value={email} onChange={(email) => setEmail(email.target.value)} className='email-input' type="email" placeholder="Email" />
            <input value={password} onChange={(password) => setPassword(password.target.value)} className='password-input' type="password" placeholder="Password" />
            <p>Dont have an account <NavLink to="/register">Register</NavLink> </p>
            <Button className='login-btn' onClick={() => Login()} variant='contained' color='success'>{loading ? "Please wait..." : "Login"}</Button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <div>
                <p className="chatify-head">Chatify </p>
              </div>
              <div>
                <img style={{ margin: "0 0 0 10px", width: "60px", height: "60px" }} src={ChatIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const RegisterForm = ({ Register, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, ChatIcon, loading }) => {
  return (
    <div className='register-form-container'>
      <div className="register-container">
        <div className="white-card-container">
          <form>
            <p className="register-head">Register</p>
            <input value={firstName} onChange={(firstName) => setFirstName(firstName.target.value)} className='email-input' type="text" placeholder="Enter your first name" />
            <input value={lastName} onChange={(lastName) => setLastName(lastName.target.value)} className='email-input' type="text" placeholder="Enter your last name" />
            <input value={email} onChange={(email) => setEmail(email.target.value)} className='email-input' type="email" placeholder="Email" />
            <input value={password} onChange={(password) => setPassword(password.target.value)} className='password-input' type="password" placeholder="Password" />
            <input className='image-input' type="file" />
            <Button className='login-btn' onClick={() => Register()} variant='contained' color='success'>{loading ? "Please wait..." : "Register"}</Button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <div>
                <p className="chatify-head">Chatify</p>
              </div>
              <div>
                <img style={{ margin: "0 0 0 10px", width: "60px", height: "60px" }} src={ChatIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}