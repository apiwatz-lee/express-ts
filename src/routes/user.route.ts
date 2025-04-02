import { Request, Response } from 'express';
import { getDepartmentSummary } from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.get('/users', getDepartmentSummary);

export default router;
