import { IDTO } from "../../components/dto/dto";

export interface IUpdateUserRequestDTO extends IDTO {
    id: string,
    name?: string;
    email?: string;
    birthdate?: string;
}

export interface IUpdateUserResponseDTO extends IDTO {
    id: string,
    name: string;
    email: string;
    birthdate: string;
}