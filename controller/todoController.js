const asyncHandler = require("express-async-handler")
const Todo = require("../model/Todo")
const { redis } = require("../config/redis")

exports.addTodo = asyncHandler(async (req, res) => {
    const { name, desc } = req.body
    await Todo.create({ name, desc })
    res.json({ message: "create TODO Success" })
})
exports.getTodo = asyncHandler(async (req, res) => {
    try {
        const todo = 'todos'
        const exists = await redis.exists(todo)
        let value
        if (exists) {
            value = await redis.get(todo)
            await redis.expire(todo, 50)
            console.log(value, " From  Redis")

        } else {
            const result = await Todo.find()
            await redis.set(todo, JSON.stringify(result))
            await redis.expire(todo, 10)
            value = await redis.get(todo)
            console.log(JSON.parse(value), " From DataBase")
        }
        const parseData = JSON.parse(value)
        res.json({ message: "Fetch Successs", result: parseData })
    } catch (err) {
        console.error('Error interacting with Redis:', err)
    }
})