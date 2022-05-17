import express from 'express';

const router = express.Router();
// handle undeletes
import * as deleteController  from '../controllers/deletedcontroller.js'

/* GET items. Requires update to weather as well */
router.get('/:item', deleteController.get);
  
/* POST item */
// router.post('/', itemController.create);

// /* PUT item */
// router.put('/', itemController.update);

// /* DELETE item */
// router.delete('/', itemController.remove);

export { router };