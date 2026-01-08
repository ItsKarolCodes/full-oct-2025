const express = require('express');
const router = express.Router();
const { listPersonsController, getPersonController, createPersonController, updatePersonController, deletePersonController} = require('../controllers/personsController');

router.get('/', listPersonsController);
router.get('/:id', getPersonController);
router.post('/', createPersonController);
router.put('/:id', updatePersonController);
router.delete('/:id', deletePersonController);

module.exports = router;