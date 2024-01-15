const Todo = require('../model/todo')


// Create Todo
const createTodo = async (req, res)=>{
    const {title, description} = req.body
    try {
        const existingTodo = await Todo.findOne({tittle})
        if(existingTodo){
            return res.status(409).json({error: "Todo already exist"})
        }
        const todo = new Todo({
            title,
            description,
            createdBy: req.user._id
        });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
        return res.status(201).json({message: "New Todo is created"})
    }catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
};

// Get All Todo
const getAllTodos = async (req, res)=>{
    try {
        const todos = await Todo.find({ createdBy: req.user._id});
        res.json(todos);
    }catch(error){
    res.status(500).json({error: "Internel Server error"});
    }
};


// Get a Single Todo by ID

const getSingleTodo = async (req, res)=>{
    const {todoId} = req.params;
    try{
        const todo = await Todo.findById(todoId).populate("owmer")
        if(!ownedtodo){
            return res.status(404).json({error:"Todo not found"});
        }
        res.status(todo);
    }catch(error){
        res.status(500).json({error:"Server error"})
    }
};

// Update Todo

const updateTodo = async(req, res)=>{
    try{
        const {todoId} = req.params
        const updateInfo = req.body
        const updatedTodo = await Todo.findByIdAndUpdate({
            todoId,
            updateInfo,
            createdBy: req.user._id},
            {new:true, runValidator:true}
        );

        if(!updatedTodo){
            return res.status(404).json({error:"Todo not found"});
        }
        return res.status(200).json({message: updateTodo})
    }catch(error){
        res.status(500).json({error: "Internal Server Error"})
    }
};


// Delete Todo

const deleteTodo = async(req, res)=>{
    try {
        const deleteTodo = await Todo.findByIdAndDelete({_id: req.params.todoId, createdBy: req.user._id});

        if(!deleteTodo){
            return res.status(404).json({error: "Todo not found"});
        }
        return res.status(204).send();
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
};


module.exports = {
    createTodo,
    getAllTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo
}


