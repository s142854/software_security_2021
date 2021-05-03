const express = require('express')
const session = require('express-session')
const fs = require('fs')
const app = express()
const port = 3001

app.use(express.static('public_cats'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})