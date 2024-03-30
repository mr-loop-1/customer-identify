import Knex from "knex";
import { knexSnakeCaseMappers } from "objection";
import { config as env } from "dotenv";

env();

export const knex = Knex({
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    ...knexSnakeCaseMappers(),
});
