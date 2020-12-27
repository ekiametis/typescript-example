import { Router } from "express";
import { createUserController } from "../../use-cases/create-user";
import { listUsersController } from "../../use-cases/list-users";

const router = Router();

router.post('/users', createUserController.handle);
router.get('/users', listUsersController.handle);
// router.patch('/users/{id}');
// router.get('/users/{id}');

export { router }