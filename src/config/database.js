require("dotenv").config({
    path: process.env.NODE_ENV == "test" ? ".env.test" : ".env"
  });
  
  module.exports = {
    username: process.env.DB_USER,//'postgres', //
    password: 'postgres',//'123456', //  
    host: '127.0.0.1',//'127.0.0.1', //
    database: process.env.DB_NAME,//'developers',//
    dialect: process.env.DB_DIALECT,// "postgres",  || "sqlite",
    storage: "./__tests__/database.sqlite",
    operatorsAliases: 0,
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      uderscoredAll: true
    }
  }
  
  