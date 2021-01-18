import { IDTO } from "../../components/dto/dto";

export interface IRetrieveUserRequestDTO extends IDTO {
    id: string
}

interface UserDTO extends IDTO{
    id: string,
    name: string;
    email: string;
    birthdate: string;
}

export interface IRetrieveUserResponseDTO extends UserDTO {}