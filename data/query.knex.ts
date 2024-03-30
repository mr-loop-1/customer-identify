import { knex } from "../database";
import { ICustomer, ICustomerInsert } from "../interfaces/index";

export const getCustomer = async (
    propName: string,
    value: string | number
): Promise<ICustomer | undefined> => {
    const query = knex<ICustomer>("customers");

    query.where(propName, value);

    return await query.first();
};

export const createCustomer = async (
    data: ICustomerInsert
): Promise<number> => {
    const query = knex("customers");
    query.insert<number[]>(data);

    const customerId = await query;
    return customerId[0];
};

export const getCustomerById = async (
    id: number
): Promise<ICustomer | undefined> => {
    const query = knex<ICustomer>("customers");

    query.where("id", id);

    return await query.first();
};
