export interface ICreateUserRequestDTO {
    name: string;
    email: string;
    birthday: string;
}

export interface ICreateUserResponseDTO {
    id: string,
    name: string;
    email: string;
    birthday: string;
}