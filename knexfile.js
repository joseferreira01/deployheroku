// Update with your config settings.
require("dotenv").config({
  path:
    process.env.NODE_ENV === "test"
      ? `${__dirname}/.env.test`
      : `${__dirname}/.env`,
});

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    " useNullAsDefault " : true ,
    migrations: {
      directory: __dirname + '/src/database/migrations',
  },
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    " useNullAsDefault " : true ,
    migrations: {
      directory: __dirname + '/src/database/migrations',
  },
  },

  production: {
    
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    " useNullAsDefault " : true ,
    migrations: {
      directory: __dirname + '/src/database/migrations',
  },
    
}

};
