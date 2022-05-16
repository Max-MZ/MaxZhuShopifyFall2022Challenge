import express from 'express';

const router = express.Router();

import * as itemController  from '../controllers/itemcontroller.js'
import * as warehouseController  from '../controllers/warehousecontroller.js'

/* GET items. Requires update to weather as well */
router.get('/', itemController.get);
  
/* POST item */
router.post('/', itemController.create);

/* PUT item */
router.put('/', itemController.update);

/* DELETE item */
router.delete('/', itemController.remove);

export { router };