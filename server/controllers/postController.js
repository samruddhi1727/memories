import mongoose from 'mongoose';
import postModel from '../models/postModel.js';
import { upload } from '../middleware/upload.js';

export const getAllPosts = async (req, res) => {

    const page = req.query.page
    const limit = 2
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { tags: { $regex: keyword, $options: "i" } },
            ]
        };
        const posts = await postModel.find(query).skip((page - 1) * limit).limit(limit);
        if (!posts) {
            return res.status(404).json({
                message: " No Post found.",
                success: false
            })
        };
        // const postCount = await postModel.countDocuments()/2
        const postCount = Math.ceil(await postModel.countDocuments(query) / limit);
        return res.status(200).json({
            posts,
            postCount,
            success: true
        })
    } catch (error) {

        res.status(404).json({ success: false, message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postModel.findById(id);
        res.status(200).json({ post, success: true });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}

export const createPost = async (req, res) => {

    try {
        const { title, caption, tags } = req.body;
        if (!title || !caption || !tags) {
            return res.status(400).json({
                success: false,
                message: "Missing required Details"
            });
        }

        const newPost = new postModel({ title, caption, tags, image: req.file.path, creator: req.userId, name: req.userName });
        await newPost.save();

        return res.status(201).json({ success: true, message: 'Post Created successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, caption, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ success: false, message: `No post with id: ${id}` })

    try {
        const oldPost = await postModel.findById(id);
        const editPost = {
            title: title || oldPost.title,
            caption: caption || oldPost.caption,
            tags: tags || oldPost.tags,
            image: req.file?.path || oldPost.image,
            creator: oldPost.creator,
        };
        // const editPost = { title, caption, tags, image: req.file?.path || oldPost.image, creator: req.userId }
        const result = await postModel.findByIdAndUpdate(id, editPost);
        if (!result) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        return res.status(200).json({ success: true, message: 'Post updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const likePost = async (req, res) => {
    const { id } = req.params;

    try {
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        const post = await postModel.findById(id);
        const index = post.likes.findIndex((id) => id === String(req.userId));
        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await postModel.findByIdAndUpdate(id, post, { returnDocument: "after", });
        res.status(200).json({ updatedPost, success: true });

    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    try {
        const post = await postModel.findById(id);
        post.comments.push(value);
        const updatedPost = await postModel.findByIdAndUpdate(id, post, { returnDocument: "after", });

        res.json({ updatedPost, success: true });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        await postModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Post Deleted Successfully." });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}






