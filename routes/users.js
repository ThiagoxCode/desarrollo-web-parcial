'use strict';

import express from 'express';
import { createUser, loginUser } from '../controllers/users.js';

const userRouter = express.Router();

userRouter.post('/api/user/create', createUser);
userRouter.post('/api/user/login', loginUser);

export { userRouter };
