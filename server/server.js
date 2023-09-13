const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'rahasia', // Kunci rahasia untuk mengenkripsi sesi
    resave: false, // Apakah sesi harus disimpan ulang setiap kali ada perubahan
    saveUninitialized: false, // Apakah sesi harus disimpan bahkan jika belum ada data di dalamnya
    cookie: { secure: false, maxAge: 1000*60*60*24 } // Pengaturan cookie
  }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "menusisasi28",
  database: "autentikasi",
});

// Coba terhubung ke database
db.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal: " + err.message);
  } else {
    console.log("Koneksi ke database berhasil");
  }
});

app.post("/signup", (req, res) => {
  // Mendapatkan data dari body permintaan (pastikan Anda memiliki body-parser yang sesuai)
  const { username, email, password, fullName } = req.body;

  // Validasi data yang diterima (misalnya, pastikan tidak ada data yang kosong atau tidak valid)

  // Query SQL untuk menyimpan data ke tabel "user"
  const sql =
    "INSERT INTO autentikasi.user (`username`, `email`, `password`, `name`) VALUES (?, ?, ?, ?)";
  const values = [username, email, password, fullName];

  // Eksekusi query ke database
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Kesalahan database:", err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }

    // Data berhasil ditambahkan ke tabel
    return res.status(201).json({ message: "Pendaftaran berhasil." });
  });
});

const verifyJwt = (req, res, next) => {
    const token = req.headers["access-token"];
    if(!token){
        return res.json("Butuh Token")
    }else{
        jwt.verify(token, "jwtSecretKey", (err, decoded) => {
            if(err){
                res.json("Not Authenticated")
            }else{
                const userData = {
                    username: decoded.username,
                    name: decoded.name,
                    email: decoded.email,
                };

                // Kirim data pengguna sebagai respons JSON kepada klien
                res.json(userData);
            }
        })
    }
}

app.get('/checkauth', verifyJwt, (req, res) => {
    return res.json("Authenticated")
})

app.post("/login", (req, res) => {
  // Query SQL untuk menyimpan data ke tabel "user"
  const sql =
    "SELECT * from autentikasi.user WHERE `username` = ? AND `password` = ?";

  // Eksekusi query ke database
  db.query(sql, [req.body.username, req.body.password], (err, result) => {
    if (err) {
      console.error("Kesalahan database:", err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }

    const name = result[0].name;
    const email = result[0].email;
    const username = result[0].username
    const token = jwt.sign({ username, email, name }, "jwtSecretKey", { expiresIn: 600 });

    // Data berhasil ditambahkan ke tabel
    return res.json({ Login: true, token, result });
  });
});

app.listen(8081, () => {
  console.log("listening on port 8081");
});
