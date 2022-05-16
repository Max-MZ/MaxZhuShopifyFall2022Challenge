import { pool } from '../api/postgres.js'
import * as items from '../services/itemService.js'
// import * as archive from '../controllers/deletedcontroller.js'
import * as archive from '../services/deletedService.js'

import * as warehouse from '../services/warehouseService.js'
async function get(req, res, next) {
    try {
        const weather = await warehouse.updateWeather(); 
        // console.log(weather);
        res.json(await items.getMultiple(req));
    } catch (err) {
        console.error(`Error while getting items`, err.message);
        next(err);
    }
  }
  
  async function create(req, res, next) {
    try {
      res.json(await items.create(req.body));
    } catch (err) {
      console.error(`Error while creating item`, err.message);
      next(err);
    }
  }
  
  async function update(req, res, next) {
    try {
      res.json(await items.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating items`, err.message);
      next(err);
    }
  }
  
  async function remove(req, res, next) {
    try {
      await archive.create(req.body);
      res.json(await items.remove(req.body));
      
    } catch (err) {
      console.error(`Error while deleting items`, err.message);
      next(err);
    }
  }
  
  export { get, create, update, remove}