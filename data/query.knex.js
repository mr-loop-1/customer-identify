const { knex } = require("./../database");

exports.getCustomer = async (propName, value, linkPrecendence) => {
    const query = knex("customers");

    query.where(propName, value);
    query.where("linkPrecedence", linkPrecendence);
    query.first();

    return await query;
};

exports.createCustomer = async (data) => {};
