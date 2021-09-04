const knex = require('knex');
const configuration = require('../../knexfile');
const conection = knex(configuration.staging);

module.exports = conection;