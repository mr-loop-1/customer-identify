import {
    changePrecedence,
    createCustomer,
    getCustomer,
} from "../data/query.knex";
import { ICustomer } from "../interfaces";
import { IRequest } from "../interfaces";
import handleDivergingPair from "./handleDivergingPair";

const handlePair = async (inputs: IRequest) => {
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
            linkedPrecedence: "secondary",
        };
        await createCustomer(newCustomer);
    } else if (emailMatchCustomer) {
        const newCustomer = {
            phoneNumber: inputs.phoneNumber,
            email: inputs.email,
            linkedId: emailMatchCustomer.id,
            linkedPrecedence: "secondary",
        };
        await createCustomer(newCustomer);
    } else {
        //* Create new primary doc
    }
};

export default handlePair;
