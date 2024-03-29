import type { Knex } from "knex";
import path from "path";

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST,
            port: 123434,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        },
        migrations: {
            directory: path.join(__dirname, "database/migrations"),
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST,
            port: 1234,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.join(__dirname, "database/migrations"),
            tableName: "knex_migrations",
        },
    },
};

export default config;
