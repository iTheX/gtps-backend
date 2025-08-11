const express = require('express');
const app = express();

// Middleware untuk parsing JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware CORS sederhana dan logging
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

app.all('/player/login/dashboard', function (req, res) {
  res.render(__dirname + '/public/html/dashboard.ejs', { data: {} });
});

// Endpoint login validate
app.all('/player/growid/login/validate', (req, res) => {
  // Contoh token statis tanpa mengambil dari body (bisa sesuaikan)
  const token = JSON.stringify({ server_name: 'Growtopia Server', growId: "", password: "" });
  const tokens = Buffer.from(token).toString('base64');

  res.json({
    status: "success",
    message: "Account Validated.",
    token: tokens,
    url: "",
    accountType: "growtopia",
    accountAge: 2
  });
});

// Root endpoint untuk cek server hidup
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
