const express = require('express')
const session = require('express-session')
const fs = require('fs')
const app = express()
const port = 3002

app.use(express.static('public_cors'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})