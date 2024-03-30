import { knex } from "../database.ts";
import { ICustomer } from "../interfaces/index.ts";

export const identifyCustomer = async (
    propName,
    value
): Promise<ICustomer[]> => {
    const query = knex
        .select("mainCustomer.*", "secondaryCustomer.id AS secondaryId")
        .from("customers AS mainCustomer")
        .where(propName, value)
        .where("linkPrecedence", "primary")
        .leftJoin(
            "customers AS linkCustomer",
            "customers.id",
            "customers.linkedId"
        );

    return await query;
};
