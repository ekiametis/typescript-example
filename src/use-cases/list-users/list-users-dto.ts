export interface IListUserRequestDTO {
    id?: string,
    name?: string,
    email?: string,
    birthday?: string,
}

interface UserDTO {
    id: string,
    name: string;
    email: string;
    birthday: string;
}

export interface IListUserResponseDTO {
    list: UserDTO[];
}

export class ListUserResponseDTO {

    constructor(private users: UserDTO[] = []) {}

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