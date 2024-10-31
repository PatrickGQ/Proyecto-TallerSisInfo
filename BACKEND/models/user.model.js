import mongoose, { Schema } from "mongoose";


const userModel = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['admin', 'worker'], default: 'worker'
    }
});


export default mongoose.model('User', userModel);