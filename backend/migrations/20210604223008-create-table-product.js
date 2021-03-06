'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('product', {
    key: { type: 'bigint', primaryKey: true, autoIncrement: true },
    name: { type: 'string', notNull: true },
    image: { type: 'string', notNull: true },
    created_at: {
      type: 'timestamp',
      defaultValue: new String('now()'),
      notNull: true,
    },
    updated_at: {
      type: 'timestamp',
      defaultValue: new String('now()'),
      notNull: true,
    },
  });
};

exports.down = function(db) {
  return db.dropTable('product');
};

exports._meta = {
  "version": 1
};
