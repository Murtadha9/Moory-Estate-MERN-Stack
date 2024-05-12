import express from 'express';
import { updateUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../utilis/verifyUser.js';

const router=express.Router();


router.post('/update/:id' ,verifyToken , updateUser)

export default router;