import { Sequelize } from "sequelize";

import './config.js';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;


const sequelize = new Sequelize(
  PGDATABASE as string,
  PGUSER as string,
  PGPASSWORD as string,
  {
    host: (PGHOST as string) || "localhost",
    port: Number(PGPORT) || 5432,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      preparedStatements: false,
    },
    pool: {
      max: 2,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

export default async () => {
  await sequelize
    .authenticate()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((error) => {
      console.error("PostgreSQL connection error:", error);
      process.exit(1);
    });
};
