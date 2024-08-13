const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Routes

// create a todo

app.post("/todos", async (req,res) => {
    try {
        const { description } = req.body;

        const newTodo = await sequelize.query('INSERT INTO todo (description) VALUES(:description)',{
            replacements:{
                description
            }
        });

        res.status(200).send({
            message:"Description added."
        })
    } catch (err) {
        console.error(err.message);
    }
});

// get all todos

app.get("/todos", async (req,res) =>{
    try {
        const allTodos = await sequelize.query("SELECT * FROM todo");
        res.json(allTodos[0]);
    } catch (err) {
        console.error(err.message);
    }
});


// get a todo

app.get("/todos/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const todo = await sequelize.query("SELECT * FROM todo WHERE todo_id=:id",{
            replacements:{
                id,
            }
        });
        res.json(todo[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a todo

app.put("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await sequelize.query("UPDATE todo SET description =:description WHERE todo_id =:id",{
            replacements:{
                description,
                id,
            }
        });
        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
});

// delete a todo

app.delete("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await sequelize.query("DELETE FROM todo WHERE todo_id =:id",{
            replacements:{
                id
            }
        });
        res.json("Todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000, () => {
    console.log("server has started on port 5000");
});