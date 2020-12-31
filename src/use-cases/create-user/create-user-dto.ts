export interface ICreateUserRequestDTO {
    name: string;
    email: string;
    birthdate: string;
}

export interface ICreateUserResponseDTO {
    id: string,
    name: string;
    email: string;
    birthdate: string;
}