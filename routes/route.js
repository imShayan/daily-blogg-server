import express from 'express';
import { SignUpUser , LoginUser } from '../controller/userController.js';
import { uploadImage } from '../controller/imageController.js';
import {CreatePost , DeletPost, GetAllPosts, GetPostById, UpdatePost} from '../controller/postController.js';
import upload from '../utils/upload.js'
import { PostComment, GetComments,DeleteComment } from '../controller/commentController.js';
import { authenticateToken } from '../controller/jwtController.js';


const router = express.Router();

router.post('/signup', SignUpUser);
router.post('/login', LoginUser);

router.post('/file/upload', upload.single('file'), uploadImage);
router.post('/create/post',authenticateToken, CreatePost);
router.get('/posts', authenticateToken, GetAllPosts);
router.get('/post/:id', authenticateToken, GetPostById);
router.put('/update/:id',authenticateToken , UpdatePost);
router.delete('/delete/:id' , authenticateToken, DeletPost);
router.post('/comment/new' , authenticateToken, PostComment);
router.get('/comments/:id' , authenticateToken , GetComments);
router.delete('/comment/delete/:id' , authenticateToken, DeleteComment)

export default router;
