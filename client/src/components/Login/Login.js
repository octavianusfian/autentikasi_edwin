import React, { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import classes from "./Login.module.css";
import Validation from "../../validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const Login = (props) => {
  const userRef = useRef();
  const errRef = useRef();
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/checkauth", {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data === "Butuh Token" || res.data === "Not Authenticated") {
          // Handle kesalahan autentikasi di sini
          console.log(res.data);
        } else {
          // Lanjutkan ke halaman dashboard jika autentikasi berhasil
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(Validation(data));
    if (error.username === "" && error.password === "") {
      try {
        const response = await axios.post("http://localhost:8081/login", data);

        if (response.data.Login) {
          localStorage.setItem("token", response.data.token);
        }
        navigate("/dashboard");
      } catch (err) {
        // Tangani kesalahan permintaan atau validasi lainnya dengan lebih baik
        <Alert severity="error">Gagal Melakukan Login</Alert>
      }
    }
  };

  const handleChangedButton = () => {
    props.toggleSignUp();
  };

  const handleInput = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

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
        <Typography variant="h3" gutterBottom sx={{ marginBottom: "2rem" }}>
          Sign In
        </Typography>
        <form>
          <div className={classes.sectionInput}>
            <label htmlFor="username" className={classes.label}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              ref={userRef}
              required
              onChange={handleInput}
              name="username"
              value={data.user}
              className={classes.input}
              placeholder="Enter your Username"
            />
            
            {error.username && (
              <span className={classes.error}>{error.username}</span>
            )}
          </div>
          <div className={classes.sectionInput}>
            <label htmlFor="password" className={classes.label}>
              Password:
            </label>
            <input
              type={showPwd ? 'text' : 'password'}
              id="password"
              ref={userRef}
              required
              onChange={handleInput}
              value={data.pwd}
              name="password"
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

          <Button
            variant="contained"
            size="large"
            sx={{ margin: "1rem 0", backgroundColor: "white", color: "black" }}
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </form>
        <p>
          Tidak Punya Akun ? <br /> <br />
          <span className={classes.underline}>
            <Button
              variant="outlined"
              sx={{ color: "white", fontWeight: "600" }}
              onClick={handleChangedButton}
            >
              Register
            </Button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
