export interface IListUserRequestDTO {
    id?: string,
    name?: string,
    email?: string,
    birthdate?: string,
}

interface IUserResponseDTO {
    id: string,
    name: string;
    email: string;
    birthdate: string;
}

export interface IListUserResponseDTO {
    list: IUserResponseDTO[];
}

export class ListUserResponseDTO {

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