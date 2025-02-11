import express from 'express';
import {loginUser, paymentRazorpay, registerUser,useCredits, verifyRazorpay} from '../controllers/userController.js'
import { userAuth } from '../middlewares/auth.js';

const userRoute = express.Router()

userRoute.post('/login',loginUser);
userRoute.post('/register',registerUser);
userRoute.get('/credits',userAuth,useCredits)
userRoute.post('/pay-razor',userAuth,paymentRazorpay)
userRoute.post('/verify-razor',verifyRazorpay)
export default userRoute;