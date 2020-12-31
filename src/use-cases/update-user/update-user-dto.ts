export interface IUpdateUserRequestDTO {
    id: string,
    name?: string;
    email?: string;
    birthdate?: string;
}

export interface IUpdateUserResponseDTO {
    id: string,
    name: string;
    email: string;
    birthdate: string;
}