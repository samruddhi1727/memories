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
};
export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        await postModel.findByIdAndRemove(id);
        res.json({ success: true, message: "Post deleted successfully." });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}
// export const getPosts = async (req, res) => {
//     const { page } = req.query;

//     try {
//         const LIMIT = 8;
//         const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

//         const total = await postModel.countDocuments({});
//         const posts = await postModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

//         res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
//     } catch (error) {
//         res.status(404).json({ success: false, message: error.message });
//     }
// }

// export const getPostsBySearch = async (req, res) => {
//     const { searchQuery, tags } = req.query;

//     try {
//         const title = new RegExp(searchQuery, "i");

//         const posts = await postModel.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

//         res.json({ data: posts });
//     } catch (error) {
//         res.status(404).json({ success: false, message: error.message });
//     }
// }

// export const getPostsByCreator = async (req, res) => {
//     const { name } = req.query;

//     try {
//         const posts = await postModel.find({ name });

//         res.json({ data: posts });
//     } catch (error) {
//         res.status(404).json({ success: false, message: error.message });
//     }
// }

export const createPost = async (req, res) => {
    console.log("getting into create")
    try {
        const { title, caption, tags } = req.body;
        if (!title || !caption || !tags) {
            return res.status(400).json({
                success: false,
                message: "Missing required Details"
            });
        }
        const newPost = new postModel({ title, caption, tags, image: req.file.path, creator: req.userId });
        await newPost.save();

        return res.status(201).json({ success: true, message: 'Post Created successfully' });

    } catch (error) {
        console.log("error 1515"); console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
}
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, caption, tags } = req.body;
    console.log("getting into edit controller")
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ success: false, message: `No post with id: ${id}` })

    try {
        //     const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
        //     await postModel.findByIdAndUpdate(id, updatedPost, { new: true });
        //     res.json(updatedPost);

        const editPost = { title, caption, tags, image: req.file.path, creator: req.userId }
        const result = await postModel.findByIdAndUpdate(id, editPost);
        if (!result) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        //you bobilosmia code const result = await postModel.findByIdAndUpdate(id, req.body);
        // if (!result) {
        //     return res.status(404).json({ success: false, message: 'Book not found' });
        // }
        return res.status(200).json({ success: true, message: 'Post updated successfully' });
    } catch (error) {
        console.log("error 2004")
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
}

// export const createPost = async (req, res) => {
// console.log("getting into create")
//     try {
//         const {  title, caption, tags, image  } = req.body;
//         if (!title || !caption|| !tags || !image ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required Details"
//             });
//         }
//         const newPost = new postModel({ title, caption, tags, image, creator: req.userId });
//         await newPost.save();

//         return res.status(201).json({ success: true, message: 'Post Created successfully' });

//     } catch (error) { console.log("error 1515");console.log(error)
//         res.status(500).json({ success: false, message: error.message });
//     }
// }
export const create = async (req, res) => {
    console.log("getting tocreate controller")
    const post = req.body;
    const newPost = new postModel({ ...post, creator: req.userId })
    try {
        await newPost.save();
        res.status(201).json({ newPost, success: true });
    } catch (error) {
        res.status(409).json({ success: false, message: error.message });
    }
}

// export const updatePost = async (req, res) => {
//     const { id } = req.params;
//     const { title, message, creator, selectedFile, tags } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
//     await postModel.findByIdAndUpdate(id, updatedPost, { new: true });
//     res.json(updatedPost);
// }




