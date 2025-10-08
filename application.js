'use strict';

import bodyParser from 'body-parser';
import express from 'express';
import { customerRouter } from './routes/customers.js';
import { userRouter } from './routes/users.js';
import { templateRouter } from './routes/templates.js';
import { messageRouter } from './routes/messages.js';

let application = express();

application.use(bodyParser.json());
application.use(userRouter);
application.use(customerRouter);
application.use(templateRouter);
application.use(messageRouter);

export { application as default };
