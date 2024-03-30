import { knex } from "../database";
import { ICustomer, LinkPrecedenceEnum } from "../interfaces/index";

export const updateLinkSecondary = async (
    primaryId: number,
    secondaryId: number
): Promise<void> => {
    const query = knex<ICustomer>("customers");

    query.where("id", secondaryId);
    query.update("linkedId", primaryId);
    query.update("linkPrecedence", LinkPrecedenceEnum.secondary);

    await query;

    return;
};

export const updateLinkMany = async (
    primaryId: number,
    linkId: number
): Promise<void> => {
    const query = knex<ICustomer>("customers");

    query.where("linkedId", linkId);
    query.update("linkedId", primaryId);

    await query;

    return;
};
