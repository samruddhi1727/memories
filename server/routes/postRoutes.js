import express from 'express';
import { getPosts, getPostsBySearch, getPostsByCreator, getPost, createPost, updatePost, likePost, commentPost, deletePost } from '../controllers/postController.js';
import auth from "../middleware/auth.js";

const postRouter = express.Router();
postRouter.get('/creator', getPostsByCreator);
postRouter.get('/search', getPostsBySearch);
postRouter.get('/getAllposts', getPosts);
postRouter.get('/getPost/:id', getPost);

postRouter.post('/create', auth,  createPost);
postRouter.patch('/edit/:id', auth, updatePost);
postRouter.delete('/delete/:id', auth, deletePost);
postRouter.patch('/likePost/:id', auth, likePost);
postRouter.post('/commentPost/:id', commentPost);

export default postRouter;