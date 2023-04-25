const express = require('express')
var body = require ('body-parser')

const app = express()

app.use(express.json())

const menuController = require("../controller/menuController")

app.get("/getAll", menuController.getAllMenu)
app.post("/", menuController.addMenu)
app.post("/find", menuController.findMenu)
app.put("/:id", menuController.updateMenu)
app.delete("/:id", menuController.deleteMenu)

module.exports = app