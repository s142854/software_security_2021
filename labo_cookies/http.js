const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const session = require('express-session');


const app = express();
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static('public'))
app.set('view engine', 'ejs');

let options = null;
try {
    options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'),
        secureProtocol: 'TLSv1_2_method',
        ciphers: 'TLS_RSA_WITH_AES_128_GCM_SHA256'
    };
} catch (e) {

}

app.get('/show_cookies', (req, res) => {
    res.render('showCookies');
})

app.get('/hide_me/show_cookies', (req, res) => {
    res.render('showCookies');
})

app.get('/set_cookies', (req, res) => {
    res.cookie('cookie_1', 'delicious', {
        path: '/',
        expires: new Date('2022-01-01T10:00:00.000Z'),
        httpOnly: false,
        secure: false
    });
    res.cookie('cookie_2', 'tasty', {
        path: '/',
        maxAge: 180000, // 3 minuten.
        httpOnly: false,
        secure: false
    });
    res.cookie('cookie_3', 'appetizing', {
        path: '/',
        httpOnly: true,
        secure: false
    });
    res.cookie('cookie_4', 'heavenly', {
        path: '/',
        httpOnly: false,
        secure: true
    });
    res.cookie('cookie_5', 'palatable', {
        path: '/hide_me',
        httpOnly: false,
        secure: false
    });
    res.send('Cookies set!');
});

const auth = (req, res, next) => {
    if (req.session && req.session.user === 'admin' && req.session.admin)
        return next();
    else
        return res.sendStatus(401);
};

// Login endpoint
app.get('/login', (req, res) => {
    if (!req.query.username || !req.query.password) {
        res.send('login failed');
    } else if (req.query.username === 'admin' || req.query.password === 'admin') {
        req.session.user = 'admin';
        req.session.admin = true;
        res.send('login success!');
    }
});

// Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.send('logout success!');
});

app.get('/', auth, function (req, res) {
    res.render('loggedin');
});


http.createServer(app).listen(3000, () => {
    console.log('HTTP server started on http://localhost:3000');
});
https.createServer(options, app).listen(3001, () => {
    if (options) {
        console.log('Certificate loaded.');
    } else {
        console.log('You have not generated a certificate yet. ')
    }
    console.log('HTTPS server started on https://localhost:3001');
});
