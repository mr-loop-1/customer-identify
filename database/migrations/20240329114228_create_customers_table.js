const { timestamps, onUpdateTrigger } = require("./../timestamps");
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
            table.bigInteger("linkedId").unsigned().index().nullable();
            table
                .foreign("linkedId")
                .references("id")
                .inTable("customers")
                .onDelete("CASCADE");
            table.enum("linkPrecedence", ["primary", "secondary"]);
            // .defaultTo("primary");
            table.dateTime("deletedAt").nullable();
            timestamps(knex, table);
        }
    );
    await knex.raw(onUpdateTrigger("customers"));
    return migration;
};

exports.down = async function (knex) {
    await knex.schema.dropTable("customers");
};
