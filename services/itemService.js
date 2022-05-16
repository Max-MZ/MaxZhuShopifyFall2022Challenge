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
    `INSERT INTO Items  (ItemName, WarehouseLocation, Active) VALUES ($1, $2, $3)`, 
    [
      item.name, item.warehouse, 'true'
    ]
  );

  let message = 'Error in creating item';

  if (result.affectedRows) {
    message = 'Item created successfully';
  }

  return {message};
}

async function update(id, item){  // gotta do this
  const result = await db.query(
    `UPDATE Items 
    SET name=?, released_year=?, githut_rank=?, 
    pypl_rank=?, tiobe_rank=? 
    WHERE id=?`, 
    [
      item.name, item.released_year,
      item.githut_rank, item.pypl_rank,
      item.tiobe_rank, id
    ]
  );

  let message = 'Error in updating items';

  if (result.affectedRows) {
    message = 'items updated successfully';
  }

  return {message};
}

async function remove(item){
  const result = await pool.query(
    `UPDATE Items SET Active = 'f'  WHERE ItemName=$1`, 
    [item.name]
  );

  let message = 'Error in deleting item';

  if (result.affectedRows) {
    message = 'item deleted successfully';
  }

  return {message};
}

export {getMultiple, create, update, remove}