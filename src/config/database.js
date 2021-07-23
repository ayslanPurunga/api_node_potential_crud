const sqliteConfig = {
  dialect: process.env.DB_DIALECT,
  storage: "./__tests__/database.sqlite",
  operatorsAliases: 0,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    uderscoredAll: true,
  },
};

const postgresConfig = {
  username: process.env.DB_USER, //'postgres', //
  password: process.env.DB_PASS, //'123456', //
  host: process.env.DB_HOST, //'127.0.0.1', //
  database: process.env.DB_NAME, //'developers',//
  dialect: process.env.DB_DIALECT, // "postgres",  || "sqlite",
  operatorsAliases: 0,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    uderscoredAll: true,
  },
};

module.exports = process.env.NODE_ENV === 'test' ?  sqliteConfig : postgresConfig 