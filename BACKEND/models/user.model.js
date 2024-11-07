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
        enum: ['admin', 'worker','client'], default: 'client'
    }
});


export default mongoose.model('User', userModel);