import React, { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import classes from "./Register.module.css";
import Validation from "../../validation";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";



const Register = (props) => {
  const userRef = useRef();
  const errRef = useRef();
  
  const [error, setError] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    fullName: '',

  })


  const [errMsg, setErrMsg] = useState("");


  useEffect(() => {
    setErrMsg("");
  }, [data.username, data.password]);

  const handleSubmit = async(e) => {
    
    e.preventDefault();
    const err = Validation(data);
    setError(err);
    if(error.username === "" && error.password === "" && error.email === "" && error.fullName === ""){
      axios.post('http://localhost:8081/signup', data)
        .then(res => {
          handleChangedButton();
        })
        .catch(err => {
          <Alert severity="error">Register Akun Gagal</Alert>
        });
    }
      
    // console.log(data);
    

  };

  const handleChangedButton = () => {
    props.toggleSignUp();
  }

  const handleInput = (e) => {
    setData(prev => ({...prev, [e.target.name]: [e.target.value]}))
  }

  return (
    <div className={classes.container}>
        <div className={classes.box}>

        
      <p
        ref={errRef}
        className={errMsg ? "errMsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Typography variant="h3" gutterBottom  sx={{marginBottom: '2rem'}}>
        Register
      </Typography>
      <form >
        <div className={classes.sectionInput}>
          <label htmlFor="username" className={classes.label}>Username:</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            ref={userRef}
            required
            name="username"
            onChange={handleInput}
            value={data.username}
            className={classes.input}
            placeholder="Enter your username"
          />
          {error.username && (
              <span className={classes.error}>{error.username}</span>
            )}
        </div>
        <div className={classes.sectionInput}>
          <label htmlFor="password" className={classes.label}>Password:</label>
          <input
            type="password"
            id="password"
            ref={userRef}
            required
            onChange={handleInput}
            name="password"
            value={data.password}
            className={classes.input}
            placeholder="Enter your Password"
          />
          <label className={classes.showPwd}>
              <input
                type="checkbox"
                checked={showPwd}
                onChange={() => setShowPwd(!showPwd)}
              />
              Tampilkan kata sandi
            </label>
          {error.password && (
              <span className={classes.error}>{error.password}</span>
            )}
        </div>

        <div className={classes.sectionInput}>
          <label htmlFor="confirmPassword" className={classes.label}>Confirm Password: </label>
          <input
            type="password"
            id="confirmPassword"
            ref={userRef}
            required
            name="confirmPassword"
            onChange={handleInput}
            value={data.confirmPassword}
            className={classes.input}
            placeholder="Enter your confirm password"
          />
          <label className={classes.showPwd}>
              <input
                type="checkbox"
                checked={showPwd}
                onChange={() => setShowPwd(!showPwd)}
              />
              Tampilkan kata sandi
            </label>
          {data.password !== data.confirmPassword && <span className={classes.error}>Password tidak sama</span>}
        </div>

        <div className={classes.sectionInput}>
          <label htmlFor="email" className={classes.label}>Email: <br/> </label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            ref={userRef}
            required
            name="email"
            onChange={handleInput}
            value={data.email}
            className={classes.input}
            placeholder="Enter your email"
          />
          {error.email && (
              <span className={classes.error}>{error.email}</span>
            )}
        </div>

        <div className={classes.sectionInput}>
          <label htmlFor="fullName" className={classes.label}>Full Name: </label>
          <input
            type="text"
            id="fullName"
            autoComplete="off"
            ref={userRef}
            required
            name="fullName"
            onChange={handleInput}
            value={data.fullName}
            className={classes.input}
            placeholder="Enter your full name"
          />
          {error.fullName && (
              <span className={classes.error}>{error.fullName}</span>
            )}
        </div>

        <Button variant="contained" sx={{margin: '1rem 0', backgroundColor: 'white', color: 'black'}} onClick={handleSubmit}>Sign Up</Button>
      </form>
      <p>
       Sudah punya akun? <br />{" "}
        <span className={classes.underline}>
        <Button variant="outlined" sx={{color: 'white', fontWeight: '600'}} onClick={handleChangedButton}>Sign In</Button>
        </span>
      </p>
      </div>
    </div>
  );
};

export default Register;
