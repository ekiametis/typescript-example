export interface IRepository<E, ID> {

    save(entity: E): Promise<E>;
    findById(id: ID): Promise<E>;
    findAll(): Promise<E[]>;
    deleteById(id: ID): Promise<E>;
    deleteAll(): Promise<Number>;
}