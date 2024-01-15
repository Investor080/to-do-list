const mongoose = require('mongoose')
const {Schema, model} = mongoose

const TodoSchema = new Schema ({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status:{
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
}, { timestamps: true});

const Todo = model('Todo', TodoSchema)

module.exports = Todo;