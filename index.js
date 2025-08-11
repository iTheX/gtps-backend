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

app.all("/player/validate/close", function (req, res) {
  res.send("<script>window.close();</script>");
});

app.set('view engine', 'ejs');
app.all('/player/login/dashboard', function (req, res) {
  res.render(__dirname + '/public/html/dashboard.ejs');
});

// Endpoint login validate
app.all('/player/growid/login/validate', (req, res) => {
   res.send(
        `{"status":"success","message":"Account Validated.","token":"${tokens}","url":"","accountType":"growtopia", "accountAge": 2}`,
    );
});

app.all('/player/growid/checktoken', (req, res) => {
    res.json({
        status: 'success',
        message: 'Account Validated.',
        token: "GrowtopiaServerToken",
        url: '',
        accountType: 'growtopia',
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
