import { v4 as uuid } from 'uuid';
import { IEntity } from './entity';

export class User implements IEntity{

    public readonly id: string;
    public name: string;
    public email: string;
    public birthday: string;

    constructor(props: Omit<User, 'id'>, id?: string) {
        Object.assign(this, props);
        if(!id) {
            this.id = uuid();
        }
    }
}