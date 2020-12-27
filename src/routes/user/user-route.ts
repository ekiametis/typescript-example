import { Router } from "express";
import { createUserController } from "../../use-cases/create-user";

const router = Router();

router.post('/users', createUserController.handle);
// router.get('/users');
// router.patch('/users/{id}');
// router.get('/users/{id}');

export { router }