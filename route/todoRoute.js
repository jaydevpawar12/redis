const { addTodo, getTodo } = require("../controller/todoController")



const router = require("express").Router()

router

.get('/get', getTodo)
.post('/add', addTodo)

module.exports = router