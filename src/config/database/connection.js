import knex from 'knex';

const bauenConfig = {
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "943206Kgm",
    database: 'bauen',
    options: {
      encrypt: false,
      enableArithAbort: false,
    },
  },
};
export const bauen = knex(bauenConfig);
