const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    _id : Schema.Types.ObjectId,
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],

});

module.exports = mongoose.model('Category', categorySchema);