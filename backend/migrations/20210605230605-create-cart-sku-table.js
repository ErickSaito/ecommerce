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
  return db.createTable('cart_sku', {
    key: { type: 'bigint', primaryKey: true },
    qty: { type: 'int', notNull: true, defaultValue: 0 },
    cart_key: {
      type: 'bigint',
      notNull: true,
      foreignKey: {
        name: 'cart_sku_cart_key_fk',
        table: 'cart',
        rules: {
          onDelete: 'CASCADE'
        },
        mapping: 'key'
      }
    },
    sku_key: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'cart_sku_sku_key_fk',
        table: 'sku',
        rules: {
          onDelete: 'CASCADE'
        },
        mapping: 'key'
      }
    },
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
  return db.dropTable('cart_sku');
};
exports._meta = {
  "version": 1
};
