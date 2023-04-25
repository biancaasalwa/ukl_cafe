const bodyParser = require("body-parser")
const express = require(`express`)
const app = express()
const cors = require('cors')
app.use(cors())
const PORT = 8000

const userRoute = require("./routes/user.route")
const menuRoute = require("./routes/menu.route")


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/user",userRoute)
app.use("/menu", menuRoute)



app.use(express.static(__dirname))

app.listen(PORT, ()=>{
    console.log(`barakallah${PORT}`)
})