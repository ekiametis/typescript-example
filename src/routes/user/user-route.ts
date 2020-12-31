import { Router } from "express";
import { createUserController } from "../../use-cases/create-user";
import { listUsersController } from "../../use-cases/list-users";
import { retrieveUserController } from "../../use-cases/retrieve-user";

const router = Router();

router.post('/users', createUserController.handle);
router.get('/users', listUsersController.handle);
router.get('/users/:id', retrieveUserController.handle);
// router.patch('/users/{id}');

export { router }