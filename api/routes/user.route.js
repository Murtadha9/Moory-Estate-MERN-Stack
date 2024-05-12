import express from 'express';
import { updateUser ,deleteUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../utilis/verifyUser.js';

const router=express.Router();


router.post('/update/:id' ,verifyToken , updateUser)
router.delete('/delete/:id' ,verifyToken , deleteUser)



export default router;