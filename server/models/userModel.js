import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema, 'user');
export default userModel;