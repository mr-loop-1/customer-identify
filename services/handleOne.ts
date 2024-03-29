import { getCustomer } from "../data/query.knex";

const handleOne = async (propName, inputs) => {
    const matchCustomer = await getCustomer(
        propName,
        inputs[propName],
        "primary"
    );
};

export default handleOne;
