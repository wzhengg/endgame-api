import express from 'express';
import { validateRequest } from '../middleware/validation-middleware';
import { bodyValidation, createUser } from '../controllers/user-controller';

const router = express.Router();

// POST request for creating a user
router.post('/', bodyValidation(), validateRequest, createUser);

export default router;
