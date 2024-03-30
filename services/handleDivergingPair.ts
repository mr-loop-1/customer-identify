import { updateLinkMany, updateLinkSecondary } from "../data/link.knex";
import { ICustomer } from "../interfaces";

const handleDivergingPair = async (
    customer1: ICustomer,
    customer2: ICustomer
): Promise<void> => {
    const [olderCustomer, newCustomer] =
        customer1.createdAt < customer2.createdAt
            ? [customer1, customer2]
            : [customer2, customer1];

    const primaryId = olderCustomer.id;
    const danglingId = newCustomer.id;

    //* link id of both newCustomer and its linkes Customers changed to olderCustomer id
    await updateLinkMany(primaryId, danglingId);
    await updateLinkSecondary(primaryId, danglingId);

    return Promise.resolve();
};

export default handleDivergingPair;
