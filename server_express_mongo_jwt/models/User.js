const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    _id : Schema.Types.ObjectId,
    username: { type: String, },
    password: { type: String,  },
    email: { type: String,  },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);