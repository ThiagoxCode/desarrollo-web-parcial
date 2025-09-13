'use strict';

import bodyParser from 'body-parser';
import express from 'express';
import { movieRouter } from './routes/movies.js';
import { userRouter } from './routes/users.js';

let application = express();

application.use(bodyParser.json());
application.use(movieRouter);
application.use(userRouter);

export { application as default };
