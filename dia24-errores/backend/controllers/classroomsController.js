const { listClassrooms, getClassroom, createClassroom, updateClassroom, deleteClassroom } = require('../models/classroomModel');

const listClassroomsController = (req, res, next) => {
    try {
        const classrooms = listClassrooms();
        res.status(200).json(classrooms);
    } catch (error) {
        next(error);
    }
}

const getClassroomController = (req, res, next) => {
    try {
        const classroom = getClassroom(req.params.id);
        if (!classroom) return res.status(404).json({ error: 'Classroom not found' });
        res.status(200).json(classroom);
    } catch (error) {
        next(error);
    }
}

const createClassroomController = (req, res, next) => {
    try {
        const { name, teacher_id, students } = req.body;
        if (!name || !teacher_id || !students) {
            return res.status(400).json({ error: 'Missing fields' });
        }
        res.status(201).json(createClassroom(req.body));
    } catch (error) {
        next(error);
    }
}

const updateClassroomController = (req, res, next) => {
    try {
        const classroom = getClassroom(req.params.id);
        if (!classroom) return res.status(404).json({ error: 'Classroom not found' });
        res.status(201).json(updateClassroom(req.params.id, req.body));
    } catch (error) {
        next(error);
    }
}

const deleteClassroomController = (req, res, next) => {
    try {
        const classroom = getClassroom(req.params.id);

        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }

        deleteClassroom(req.params.id)
        res.json({ message: 'Classroom deleted' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listClassroomsController,
    getClassroomController,
    createClassroomController,
    updateClassroomController,
    deleteClassroomController
};