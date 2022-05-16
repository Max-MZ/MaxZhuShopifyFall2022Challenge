import { pool } from '../api/postgres.js'

async function get(req, res, next) {
    try {
        await
        res.json(await programmingLanguages.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting items`, err.message);
        next(err);
    }
  }
  
  async function create(req, res, next) {
    try {
      res.json(await programmingLanguages.create(req.body));
    } catch (err) {
      console.error(`Error while creating items`, err.message);
      next(err);
    }
  }
  
  async function update(req, res, next) {
    try {
      res.json(await programmingLanguages.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating items`, err.message);
      next(err);
    }
  }
  
  async function remove(req, res, next) {
      console.log("deleting");
      console.log(req.body);
    try {
      res.json(await programmingLanguages.remove(req.body));
    } catch (err) {
      console.error(`Error while deleting items`, err.message);
      next(err);
    }
  }
  
  export { get, create, update, remove}