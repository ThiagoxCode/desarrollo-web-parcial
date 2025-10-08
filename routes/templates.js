'use strict';

import express from 'express';
import { createTemplate, readTemplate, updateTemplate, deleteTemplate } from '../controllers/templates.js';
import { valideToken } from '../helpers/auth.js';

const templateRouter = express.Router();

templateRouter.post('/api/template/create', valideToken, createTemplate);
templateRouter.get('/api/template/read', valideToken, readTemplate);
templateRouter.put('/api/template/update', valideToken, updateTemplate);
templateRouter.delete('/api/template/delete', valideToken, deleteTemplate);

export { templateRouter };
