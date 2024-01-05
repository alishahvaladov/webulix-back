import express from 'express';
import { validateUserID, validateUserRegister } from '../../../middleware/members/UserMiddleware';
import { getUserById, registerUserController } from '../../../controller/members/UserController';

const router = express.Router();

router.get('/getUser', validateUserID, getUserById);
router.post('/addUser', validateUserRegister, registerUserController);

export default router;
