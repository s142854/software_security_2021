const express = require('express')
const session = require('express-session')
const fs = require('fs')
const app = express()
const port = 3001

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log(req.query);
    res.redirect('http://localhost:3000/main')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})