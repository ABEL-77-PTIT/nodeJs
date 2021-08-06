const express = require('express')
const app = express()
//run website ở cổng 3000
const port = 3000
//get ở đây là định nghĩa cái route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})