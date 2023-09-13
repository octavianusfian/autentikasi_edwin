import React, { useEffect, useState } from "react";
import classes from "./Dashboard.module.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState({});

  const navigate = useNavigate();

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
          navigate("/");
        } else {
          // Lanjutkan ke halaman dashboard jika autentikasi berhasil
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={classes.body}>
      <div className={classes.box}>
        <div className={classes.header}>
          <p>Selamat Datang...</p>
          <h1>{data.name}</h1>
        </div>
        <img src="jb.jpg" alt=""/>
        <div className={classes.detail}>
          <h3>Email: {data.email}</h3>
          <h3>Username: {data.username}</h3>
        </div>
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "red" }}
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
