const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => console.log(`app listening on ${port} `))

app.use((req, res, next) => {
  console.log('first')
  next()
  console.log('first end')
})

app.use((req, res, next) => {
  console.log('second')
  next()
  console.log('second end')
})

app.use((req, res, next) => {
  console.log('third')
  next()
  console.log('third end')
})

app.get('/', (req, res) => res.send('hello world'))