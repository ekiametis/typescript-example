export interface IListUserRequestDTO {
    id?: string,
    name?: string,
    email?: string,
    birthdate?: string,
}

interface UserDTO {
    id: string,
    name: string;
    email: string;
    birthdate: string;
}

export interface IListUserResponseDTO {
    list: UserDTO[];
}

export class ListUserResponseDTO {

    private constructor(private users: UserDTO[] = []) {}

    static build(users: UserDTO[]): ListUserResponseDTO {
        return new ListUserResponseDTO(users);
    }

    push(user: UserDTO) {
        this.users.push(user);
    }

    pushAll(users: UserDTO[]) {
        this.users =  this.users.concat(users);
    }

    listAll() {
        return { list: this.users };
    }
}