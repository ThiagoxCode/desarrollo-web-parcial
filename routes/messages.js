'use strict';

import express from 'express';
import { createMessage, readMessage, updateMessage, deleteMessage } from '../controllers/message.js';
import { valideToken } from '../helpers/auth.js';

const messageRouter = express.Router();

messageRouter.post('/api/message/create', valideToken, createMessage);
messageRouter.get('/api/message/read', valideToken, readMessage);
messageRouter.put('/api/message/update', valideToken, updateMessage);
messageRouter.delete('/api/message/delete', valideToken, deleteMessage);

export { messageRouter };
