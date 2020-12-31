export interface IRetrieveUserRequestDTO {
    id: string
}

interface UserDTO {
    id: string,
    name: string;
    email: string;
    birthday: string;
}

export interface IRetrieveUserResponseDTO extends UserDTO {}