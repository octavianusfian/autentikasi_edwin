import React, { useState } from 'react'
import Login from '../../components/Login/Login'
import Register from '../../components/Register/Register'
import classes from "./LoginPage.module.css"

const LoginPage = () => {

  const [isSignUp, setIsSignUp] = useState(true);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };


  return (
    <div className={classes.body}>
      {isSignUp ? <Login toggleSignUp={toggleSignUp}/> : <Register toggleSignUp={toggleSignUp}/>}
    </div>
  )
}

export default LoginPage