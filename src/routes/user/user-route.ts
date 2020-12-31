import { Router } from "express";
import { createUserController } from "../../use-cases/create-user";
import { listUsersController } from "../../use-cases/list-users";
import { retrieveUserController } from "../../use-cases/retrieve-user";
import { updateUserController } from "../../use-cases/update-user";

const router = Router();

router.post('/users', createUserController.handle);
router.get('/users', listUsersController.handle);
router.get('/users/:id', retrieveUserController.handle);
router.put('/users/:id', updateUserController.handle);
router.patch('/users/:id', updateUserController.handle);

export { router }