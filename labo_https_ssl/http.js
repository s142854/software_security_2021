const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'ejs');

let options = null;
try {
    options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'),
    };
} catch (e) {

}

const checkCredentials = ({username, password}) => {
    if (username && password) {
        if (username === 'admin@google.com' && password === 'admin123') {
            return 'You have sucessfully logged in';
        } else {
            return 'Wrong username/password';
        }
    }
}

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/get', (req, res) => {
    res.render('form', {formMethod: 'GET', message: checkCredentials(req.query) });
});

app.get('/post', (req, res) => {
    res.render('form', {formMethod: 'POST', message: null});
});

app.post('/post', (req, res) => {
    res.render('form', {formMethod: 'POST', message: checkCredentials(req.body) });
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
