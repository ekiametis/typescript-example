import { IDTO } from "../../components/dto/dto";

export interface ICreateUserRequestDTO extends IDTO {
    name: string;
    email: string;
    birthdate: string;
}

export interface ICreateUserResponseDTO extends IDTO {
    id: string,
    name: string;
    email: string;
    birthdate: string;
}