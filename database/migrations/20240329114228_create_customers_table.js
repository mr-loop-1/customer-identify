const { onUpdateTrigger, timestamps } = require("../timestamps");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const migration = await knex.schema.createTable(
        "customers",
        function (table) {
            table.bigIncrements("id").primary();
            table.string("phoneNumber").index().nullable();
            table.string("email").index().nullable();
            table
                .foreign("linkedId")
                .references("customers.id")
                .onDelete("CASCADE")
                .nullable()
                .index();
            table
                .enum("linkPrecedence", ["primary", "secondary"])
                .defaultTo("primary");
            table.dateTime("deletedAt").nullable();
            timestamps(knex, table);
        }
    );
    await knex.raw(onUpdateTrigger("users"));
    return migration;
};

exports.down = function (knex) {};
