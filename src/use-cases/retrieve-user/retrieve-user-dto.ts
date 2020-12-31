export interface IRetrieveUserRequestDTO {
    id: string
}

interface UserDTO {
    id: string,
    name: string;
    email: string;
    birthdate: string;
}

export interface IRetrieveUserResponseDTO extends UserDTO {}