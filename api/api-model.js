const db = require('../dbConfig.js');

module.exports = {
    findBy,
    find,
    add
}


function add(user) {
    return db('users')
    .insert(user)
}

function find() {
    return db('users').select('id', 'username');
}

function findBy(filter) {
    return db('users')
    .where(filter)
    
}