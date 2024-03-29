const { knex } = require("../database");

exports.identifyCustomer = async (propName, value, linkPrecendence) => {
    const query = knex("customers");

    query.where(propName, value);

    if (linkPrecendence) {
        query.where("linkPrecedence", linkPrecendence);
        query.first();
    }

    return await query;
};
