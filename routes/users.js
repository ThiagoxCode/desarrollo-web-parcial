'use strict';

import express from 'express';
import { createUser, readUser, updateUser, deleteUser, loginUser } from '../controllers/users.js';
import { valideToken } from '../helpers/auth.js';

const userRouter = express.Router();

userRouter.post('/api/user/create', valideToken, createUser);
userRouter.get('/api/user/read', valideToken, readUser);
userRouter.put('/api/user/update', valideToken, updateUser);
userRouter.delete('/api/user/delete', valideToken, deleteUser);
userRouter.post('/api/user/login', loginUser);

export { userRouter };
