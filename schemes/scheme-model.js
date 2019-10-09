const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
}

function findSteps(schemeId) {
    return db('steps')
        .join('schemes', 'schemes.id', 'steps.scheme_id')
        .select('schemes.scheme_name', 'steps.id', 'steps.step_number', 'steps.instructions')
        .where({ scheme_id: schemeId });
}

function add(scheme) {
    return db('schemes')
        .insert(scheme, 'id')
        .then(([id]) => {
            return findById(id);
        });
}

function update(changes, id) {
    return db('schemes')
      .where('id', Number(id))
      .update(changes);
  }

  function remove(id) {
      return db('schemes')
      .where('id', Number(id))
      .delete();
  }