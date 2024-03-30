import { knex } from "../database.ts";
import { ICustomer } from "../interfaces/index.ts";

export const updateLinkSecondary = async (
    primaryId,
    secondaryId
): Promise<void> => {
    const query = knex<ICustomer>("customers");

    query.where("id", secondaryId);
    query.update("linkedId", primaryId);

    await query;

    return Promise.resolve();
};

export const updateLinkMany = async (primaryId, linkId): Promise<void> => {
    const query = knex<ICustomer>("customers");

    query.where("linkedId", linkId);
    query.update("linkedId", primaryId);

    await query;

    return Promise.resolve();
};