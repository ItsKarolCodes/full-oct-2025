const express = require('express');
const router = express.Router();
const { listClassroomsController, getClassroomController, createClassroomController, updateClassroomController, deleteClassroomController} = require('../controllers/classroomsController');

router.get('/', listClassroomsController);
router.get('/:id', getClassroomController);
router.post('/', createClassroomController);
router.put('/:id', updateClassroomController);
router.delete('/:id', deleteClassroomController);

module.exports = router;