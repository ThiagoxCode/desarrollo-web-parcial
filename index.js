'use strict';

import application from './application.js';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/web');

application.listen(8080);
