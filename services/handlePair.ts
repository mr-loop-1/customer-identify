import { getCustomer } from "../data/query.knex";
import { IRequest } from "../interfaces/request";

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
        if (phoneMatchCustomer.id === emailMatchCustomer.id) {
            // return phoneMatchCustomer;
        } else {
        }
    } else if (phoneMatchCustomer) {
    } else if (emailMatchCustomer) {
    } else {
    }
};

export default handlePair;
