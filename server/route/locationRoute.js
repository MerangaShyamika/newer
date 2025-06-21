const express = require('express');
const router = express.Router();
const LocationController = require('../controller/locationController');


router.post('/create',LocationController.CreateLocation);
router.get('/find-all',LocationController.GetAllLocation);
router.get('/find-by/:id',LocationController.GetLocationById);
router.put('/update/:id',LocationController.UpdateLocation);
router.delete('/delete/:id',LocationController.DeleteLocation);


module.exports = router;