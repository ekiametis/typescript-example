export interface IUpdateUserRequestDTO {
    id: string,
    name?: string;
    email?: string;
    birthday?: string;
}

export interface IUpdateUserResponseDTO {
    id: string,
    name: string;
    email: string;
    birthday: string;
}