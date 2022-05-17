// const db = require('./db.service');
// const helper = require('../utils/helper.util');
// const config = require('../configs/general.config');

import { pool } from '../api/postgres.js'

async function getMultiple(page = 1){
  const rows = await pool.query(
    `SELECT ItemName, Items.WarehouseLocation, weather  FROM Items  LEFT JOIN warehouses ON warehouses.warehouselocation = items.warehouselocation WHERE Active = True  `
  );
  const data = rows.rows;

  return {
    data
  }
}

async function create(deletedItem){
  const result = await pool.query(
    `INSERT INTO Archived  (Item, Reason) VALUES ($1, $2) ON CONFLICT (Item) DO UPDATE SET Reason=$2 WHERE Archived.Item=$1`, 
    [
        deletedItem.name, deletedItem.reason
    ]
  );

  let message = 'Error in creating item';

  if (result.rowCount) {
    message = 'Item created successfully';
  }

  return {message};
}


async function remove(item){
  const result = await pool.query(
    `UPDATE Items WHERE ItemName=$1 SET Active = 'f'`, 
    [item.name]
  );

  let message = 'Error in deleting item';
    
  if (result.rowCount) {
    message = 'item deleted successfully';
  }

  return {message};
}

export {getMultiple, create, remove}