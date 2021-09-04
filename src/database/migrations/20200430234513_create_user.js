
exports.up = function(knex) {
 return knex.schema.createTable('user',function(table){
    table.increments();
      table.string('email').unique();
      table.string('name').notNullable();
      table.string('password').notNullable();   
      table.string('token').notNullable();
      table.string('status').notNullable();
      table.string('date_token');
    
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('user');
};
