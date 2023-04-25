const express = require('express')
var body = require ('body-parser')

const app = express()

app.use(express.json())

const userController = require("../controller/userController")

app.get("/getAll", userController.getAllUser)
app.post("/", userController.addUser)
app.post("/find", userController.findUser)
app.put("/:id", userController.updateUser)
app.delete("/:id", userController.deleteUser)

module.exports = app