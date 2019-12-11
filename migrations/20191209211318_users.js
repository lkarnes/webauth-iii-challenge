
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
      users.increments();
      users.string('username', 128).notNullable().unique();
      users.string('password').notNullable();
      users.string('department', 64).notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
