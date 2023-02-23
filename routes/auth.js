import express from 'express';
import {getMe, login, register} from '../controllers/auth.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,getMe);

export { router }