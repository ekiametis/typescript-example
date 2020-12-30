import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../enums/http-status-code";
import { ListUsersUseCase } from "./list-users-use-case";

export class ListUsersController {

    private constructor (private service: ListUsersUseCase) {
        this.handle = this.handle.bind(this);
    }

    static build(service: ListUsersUseCase): ListUsersController {
        return new ListUsersController(service);
    }

    async handle (req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const response = await this.service.execute(req.query);
            return res.status(HttpStatusCode.SUCCESS).json(response);
        } catch(err) {
            next(err);
        }
    }
}