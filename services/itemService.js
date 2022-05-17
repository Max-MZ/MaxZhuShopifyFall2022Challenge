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

async function create(item){
    console.log(item.name, item.warehouse)
  const result = await pool.query(
    `INSERT INTO Items  (ItemName, WarehouseLocation, Active) VALUES ($1, $2, $3) ON CONFLICT (ItemName) DO UPDATE SET WarehouseLocation = $2, Active='t'`, 
    [
      item.name, item.warehouse, 'true'
    ]
  );

  console.log(result);

  let message = 'Error in creating item';

  if (result.rowCount) {
    message = 'Item created successfully';
  }

  return {message};
}

async function remove(item){
  const result = await pool.query(
    `UPDATE Items SET Active = 'f'  WHERE ItemName=$1`, 
    [item.name]
  );

  let message = 'Error in deleting item';
  console.log(result);
  if (result.rowCount) {
    message = 'item deleted successfully';
  }

  return {message};
}


async function setActive(item){
  const result = await pool.query(
    `UPDATE Items SET Active = 't'  WHERE ItemName=$1`, 
    [item]
  );

  let message = 'Error in undeleting item';

  if (result.rowCount) {
    message = 'item undeleted successfully';
  }

  return {message};
}
export {getMultiple, create, remove, setActive}