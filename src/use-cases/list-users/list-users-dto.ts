import { IDTO } from "../../components/dto/dto";

export interface IListUserRequestDTO extends IDTO {
    id?: string,
    name?: string,
    email?: string,
    birthdate?: string,
}

interface IUserResponseDTO extends IDTO {
    id: string,
    name: string;
    email: string;
    birthdate: string;
}

export interface IListUserResponseDTO extends IDTO {
    list: IUserResponseDTO[];
}

export class ListUserResponseDTO implements IDTO {

    private constructor(private users: IUserResponseDTO[] = []) {}

    static build(users: IUserResponseDTO[]): ListUserResponseDTO {
        return new ListUserResponseDTO(users);
    }

    push(user: IUserResponseDTO) {
        this.users.push(user);
    }

    pushAll(users: IUserResponseDTO[]) {
        this.users =  this.users.concat(users);
    }

    listAll() {
        return { list: this.users };
    }
}