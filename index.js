const express = require('express')
const connectToMongose = require('./db')
const app = express()
const port = 5000

var cors = require('cors')// cors is use to 

//middlewere - use to get request in browser
app.use(cors())
// here is the middlewere - use to send req in json
app.use(express.json())





// connecting to my db
connectToMongose().catch(err => console.log(err));

//avalible routes == it use theat endpoing to response
app.use('/api/auth', require("./routes/auth"))
app.use('/api/notes', require("./routes/notes"))




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})



