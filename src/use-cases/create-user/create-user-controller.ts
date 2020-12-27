import { CreateUserUseCase } from "./create-user-use-case";
import { Request, Response, NextFunction } from "express";
import { UserAlreadyExist } from "../../exceptions/users/user-already-exists";
import { HttpStatusCode } from "../../enums/http-status-code";
import { HttpException } from "../../exceptions/http/http-exception";

export class CreateUserController {

    constructor (
        private service: CreateUserUseCase,
    ) {
        this.handle = this.handle.bind(this);
    }

    async handle (req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { name, email, birthday } = req.body;
        try {
            const response = await this.service.execute({ name, email, birthday });
            return res.status(HttpStatusCode.CREATED).json(response);
        } catch(err) {
            let formattedError = err;
            if(err instanceof UserAlreadyExist) {
                formattedError = HttpException.build(HttpStatusCode.CONFLICT, 1000, err.message);
            }
            next(formattedError);
        }
    }
}