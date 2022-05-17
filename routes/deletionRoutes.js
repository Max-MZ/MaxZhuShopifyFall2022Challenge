import express from 'express';

const router = express.Router();
// handle undeletes
import * as deleteController  from '../controllers/deletedcontroller.js'

/* GET items. Requires update to weather as well */
router.get('/:item', deleteController.get);

export { router };