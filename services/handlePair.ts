import { createCustomer, getCustomer } from "../data/query.knex";
import { IRequest, LinkPrecedenceEnum } from "../interfaces";
import handleDivergingPair from "./handleDivergingPair";

const handlePair = async (inputs: IRequest): Promise<void> => {
    const phoneMatchCustomer = await getCustomer(
        "phoneNumber",
        inputs.phoneNumber,
        "primary"
    );
    const emailMatchCustomer = await getCustomer(
        "email",
        inputs.email,
        "primary"
    );

    if (phoneMatchCustomer && emailMatchCustomer) {
        if (phoneMatchCustomer.id !== emailMatchCustomer.id) {
            //* convert younger into secondary
            //* chain others too into that - relink chain
            await handleDivergingPair(phoneMatchCustomer, emailMatchCustomer);
        }
    } else if (phoneMatchCustomer) {
        const newCustomer = {
            phoneNumber: inputs.phoneNumber,
            email: inputs.email,
            linkedId: phoneMatchCustomer.id,
            linkPrecedence: LinkPrecedenceEnum.secondary,
        };
        await createCustomer(newCustomer);
    } else if (emailMatchCustomer) {
        const newCustomer = {
            phoneNumber: inputs.phoneNumber,
            email: inputs.email,
            linkedId: emailMatchCustomer.id,
            linkPrecedence: LinkPrecedenceEnum.secondary,
        };
        await createCustomer(newCustomer);
    } else {
        const newCustomer = {
            phoneNumber: inputs.phoneNumber,
            email: inputs.email,
            linkPrecedence: LinkPrecedenceEnum.primary,
        };
        await createCustomer(newCustomer);
    }

    return Promise.resolve();
};

export default handlePair;
