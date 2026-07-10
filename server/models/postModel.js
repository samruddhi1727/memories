import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String },
    message: { type: String },
    name: { type: String },
    creator: { type: String },
    tags: [String],
    selectedFile: { type: String },
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
   
}, {
  timestamps: true, 
});

const postModel = mongoose.models.post || mongoose.model('post', postSchema, 'postt');
export default postModel;

