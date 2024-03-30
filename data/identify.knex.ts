import { knex } from "../database";
import { ICustomer, LinkPrecedenceEnum } from "../interfaces/index";

export const identifyCustomer = async (
    propName,
    value
): Promise<ICustomer[]> => {
    const query = knex
        .select("mainCustomer.*", "linkCustomer.id AS secondaryId")
        .from("customers AS mainCustomer")
        .where(`mainCustomer.${propName}`, value)
        .where("mainCustomer.linkPrecedence", LinkPrecedenceEnum.primary)
        .leftJoin(
            "customers AS linkCustomer",
            "mainCustomer.id",
            "linkCustomer.linkedId"
        );
    return await query;
};
