import { pool } from '../api/postgres.js'
import * as archive from '../services/deletedService.js'
import * as items from '../services/itemService.js'
async function get(req, res, next) {
    try {
        console.log("undeleting! ")
        console.log(req.params.item)
        res.json(await items.setActive(req.params.item));
    } catch (err) {
        console.error(`Error while undeleting`, err.message);
        next(err);
    }
  }
  
  async function create(req, res, next) {
    try {
        console.log("creating")
        console.log(req.body)
        res.json(await archive.create(req.body));
    } catch (err) {
        console.error(`Error while creating item`, err.message);
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
  
  
  export { get, create, update}