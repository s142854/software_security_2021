const express = require('express')
const html = require('html-entities');
const sqlite3 = require('sqlite3');
const session = require('express-session')
const fs = require('fs')
const app = express()
const port = 3000

const db = new sqlite3.Database('./tickets.db');
const SESSION_SECRET = Buffer.from(require('os').userInfo().username).toString('base64');

const clearDB = (cb) => {
  console.log('DELETING TICKETS: All your databases are belong to us!');
  db.run(`DELETE FROM Ticket`, (err) => {
    cb && cb();
  });
}

app.use(session({ secret: SESSION_SECRET }))
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get('/buy-ticket', (req, res) => {
  if (!req.session.user) {
    res.status(401);
    res.send('You do not have access to this page.')
    return;
  }
  res.render('buyTicket', { error: null });
});

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/logout', (req, res) => {
  req.session.user = null;
  res.render('login');
});

app.get('/cleardb', (req, res) => {
  clearDB(() => {
    res.redirect('show-tickets');
  });
});

app.post('/', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let expectedSolution = eval(req.body.captchaSource);
  let givenSolution = req.body.captchaSolution;

  console.log(expectedSolution);
  console.log(givenSolution);

  if (expectedSolution != givenSolution) {
    res.render('login', {error: `Invalid captcha solution (Expected ${expectedSolution})`});
    return;
  }

  console.log(`select * from User where username='${username}' AND password='${password}'`);
  db.all(`select * from User where username='${username}' AND password='${password}'`,(error, rows) => {
    if (rows.length > 0) {
      req.session.user = {
        username: rows[0].username,
        password: rows[0].password,
        fullname: rows[0].fullname,
        admin: rows[0].admin === 'true'
      }
      res.redirect('/buy-ticket');
      return;
    }
    res.render('login', {error: 'Invalid login/password combination'});
  });
});

app.post('/buy-ticket', (req, res) => {
  let fullname = req.session.user.fullname; // contains the full name of the logged in user
  let name = req.body.name;
  let tickets = req.body.tickets;
  let country = req.body.country;

  // TODO: Add server side validation.
  // if (a !== b) {
  //    res.send('Server validation failed');
  // }

  db.exec(`INSERT INTO Ticket VALUES ('${name}', '${country}', ${tickets})`, (err) => {
    if (err) {
      res.render('buyTicket', { error: err.toString() });
    } else {
      res.render('buyTicket', { success: `You have succesfully bought ${tickets} tickets for ${name}` });
    }
  });


});

app.get('/show-tickets', (req, res) => {
  if (!req.session.user || !req.session.user.admin) {
    res.status(401);
    res.send('You do not have access to this page.')
    return;
  }
  let name = req.query.name ? req.query.name : '';

  
  console.log(`select name, country, tickets from Ticket where name LIKE '%${name}%'`);
  db.all(`select name, country, tickets from Ticket where name LIKE ?`, '%' + name + '%', (err, rows) => {
    if (err) {
      res.render('showtickets', { error: err.toString() });
    } else {
      res.render('showtickets', { tickets: rows });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})