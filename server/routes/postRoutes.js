import express from 'express';
import { getAllPosts,  getPost, likePost, commentPost, createPost, deletePost, updatePost } from '../controllers/postController.js';
// getPosts, getPostsBySearch, getPostsByCreator,createPost
import auth from "../middleware/auth.js";
import { upload } from '../middleware/upload.js';

const postRouter = express.Router();
// postRouter.get('/creator', getPostsByCreator);
// postRouter.get('/search', getPostsBySearch);
// postRouter.get('/getAllposts', getPosts);
 postRouter.get('/getAllposts', getAllPosts);
postRouter.get('/getPost/:id', getPost);

 postRouter.post('/create', auth, upload.single("image"),  createPost);
postRouter.patch('/edit/:id', auth,  upload.single("image"), updatePost);
postRouter.delete('/delete/:id', auth, deletePost);
postRouter.patch('/likePost/:id', auth, likePost);
postRouter.post('/comment/:id',auth, commentPost);

export default postRouter;