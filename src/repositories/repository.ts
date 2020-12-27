export interface IRepository<E, ID> {

    save(entity: E): Promise<E>;
    findById(id: ID): Promise<E>;
    findAll(): Promise<E[]>;
}