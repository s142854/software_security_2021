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
    },
    {
        username: 'admin',
        password: 'admin123',
        money: 99999999
    }
]

let messages = [
    
]


app.use(express.static('public'))
app.use(session({ secret: SESSION_SECRET, cookie: {httpOnly: false} }))
app.use(express.json());
app.use(express.urlencoded());
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
        let myMessages = messages.filter(message => message.to.username === res.locals.user.username) || [];
        console.log(user);
        res.render('main', { user: user, money: user.money, users: users, messages: myMessages});
    } else {
        res.send('You are not logged in');
    }
});

app.get('/messages', (req, res) => {
    if (res.locals.user) {
        let myMessages = messages.filter(message => message.to.username === res.locals.user.username) || [];

        res.render('messages', { messages: myMessages});
    } else {
        res.send('You are not logged in');
    }
});

app.get('/logout', (req, res) => {
    req.session.user = null;
    res.render('login');
});

app.get('/users/json', (req, res) => {
    res.json(users);
});

app.post('/sendMessage', (req,res) => {
    let to = req.body.to;
    let message = req.body.message;

    let fromUser = users.find(user => user.username === req.session.user.username);
    let toUser = users.find(user => user.username === to);

    messages = [...messages, {
        from: fromUser,
        to: toUser,
        message: message
    }]

    let user = users.find(user => user.username === req.session.user.username);
    let myMessages = messages.filter(message => message.to.username === res.locals.user.username) || [];
    res.render('main', { user: user, money: user.money, users: users, messages: myMessages});

})

app.post('/sendMoney', (req, res) => {
    if (res.locals.user) {
        let to = req.body.to;
        let money = req.body.money;

        let fromUser = users.find(user => user.username === req.session.user.username);
        let toUser = users.find(user => user.username === to);

        fromUser.money = parseInt(fromUser.money) - parseInt(money);
        toUser.money = parseInt(toUser.money) + parseInt(money);
        

        let user = users.find(user => user.username === req.session.user.username);
        let myMessages = messages.filter(message => message.to.username === res.locals.user.username) || [];

        res.render('main', { user: user, money: user.money, users: users, messages: myMessages});
    } else {
        res.send('You are not logged in');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})