import { createCustomer, getCustomer } from "../data/query.knex";
import { LinkPrecedenceEnum } from "../interfaces";

const handleOne = async (propName, inputs): Promise<void> => {
    const matchCustomer = await getCustomer(
        propName,
        inputs[propName],
        "primary"
    );

    if (!matchCustomer) {
        const newCustomer = {
            [propName]: inputs[propName],
            linkPrecedence: LinkPrecedenceEnum.primary,
        };
        await createCustomer(newCustomer);
    }

    return Promise.resolve();
};

export default handleOne;
