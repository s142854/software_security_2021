const express = require('express')
const session = require('express-session')
const fs = require('fs')
const app = express()
const port = 3000

const SESSION_SECRET = Buffer.from(require('os').userInfo().username).toString('base64');

let users = [
    {
        username: 'dog',
        password: 'hunter2',
        money: 100
    },
    {
        username: 'cat',
        password: 'test123',
        money: 0
    }
]



app.use(express.static('public'))
app.use(session({ secret: SESSION_SECRET }))
app.use(express.json());
app.use(express.urlencoded());
//app.use(csrf({ cookie: true }));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    for (let user of users) {
        if (user.username == username && user.password == password) {
            req.session.user = {
                username: username,
                password: password,
            }
            res.redirect('/main');
            return;
        }
    }
    res.send('Authentication failed');

    return;
});

app.get('/main', (req, res) => {
    if (res.locals.user) {
        let user = users.find(user => user.username === req.session.user.username);
        console.log(user);
        res.render('main', { money: user.money, users: users});
    } else {
        res.send('You are not logged in');
    }
});

app.get('/logout', (req, res) => {
    req.session.user = null;
    res.render('login');
  });

app.post('/sendMoney', (req, res) => {
    if (res.locals.user) {
        let to = req.body.to;
        let money = req.body.money;

        console.log(to);
        console.log(money);

        let fromUser = users.find(user => user.username === req.session.user.username);
        let toUser = users.find(user => user.username === to);

console.log(toUser);

        fromUser.money = parseInt(fromUser.money) - parseInt(money);
        toUser.money = parseInt(toUser.money) + parseInt(money);
        

        let user = users.find(user => user.username === req.session.user.username);

        res.render('main', { money: user.money, users: users});
    } else {
        res.send('You are not logged in');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})