export interface IRepository<E, ID> {

    save(entity: E): Promise<E>;
    findById(id: ID): Promise<E>;
    findAll(): Promise<E[]>;
    find(query: Partial<E>): Promise<E[]>;
    findOne(query: Partial<E>): Promise<E>;
    deleteById(id: ID): Promise<E>;
    deleteAll(): Promise<Number>;
    updateById(id: ID, update: Partial<E>): Promise<E>;
}