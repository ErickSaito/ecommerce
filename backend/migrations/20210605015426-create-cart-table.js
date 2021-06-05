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
  return db.createTable('cart', {
    key: { type: 'bigint', primaryKey: true },
    qty: { type: 'int', notNull: true, defaultValue: 0 },
    sku: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'cart_sku_key_fk',
        table: 'sku',
        rules: {
          onDelete: 'CASCADE'
        },
        mapping: 'key'
      }
    }
  });
};

exports.down = function(db) {
  return db.dropTable('cart');
};
exports._meta = {
  "version": 1
};
