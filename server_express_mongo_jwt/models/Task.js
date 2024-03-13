const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    _id : Schema.Types.ObjectId,
    title: { type: String, },
    description: String,
    status: { type: String, default: "pending",},
    dueDate: { type: Date,},
    
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Task', taskSchema);