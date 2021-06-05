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
  return db.createTable('sku', {
    key: { type: 'string', primaryKey: true },
    inventory: { type: 'int', notNull: true, defaultValue: 0 },
    price: { type: 'bigint', notNull: true },
    product_key: {
      type: 'bigint',
      notNull: true,
      foreignKey: {
        name: 'sku_product_key_fk',
        table: 'product',
        rules: {
          onDelete: 'CASCADE'
        },
        mapping: 'key'
      }
    }
  });
};

exports.down = function(db) {
  return db.dropTable('sku');
};

exports._meta = {
  "version": 1
};
