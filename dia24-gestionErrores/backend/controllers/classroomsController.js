// 1. IMPORTANTE: Importamos el modelo de Mongoose, no las funciones antiguas
const Classroom = require('../models/classroomModel');

// LISTAR CLASES (GET)
const listClassroomsController = async (req, res, next) => {
    try {
        // Busca todas las aulas en la base de datos
        const classrooms = await Classroom.find();
        res.status(200).json(classrooms);
    } catch (error) {
        next(error);
    }
}

// OBTENER UNA CLASE (GET /:id)
const getClassroomController = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Busca por ID en MongoDB
        const classroom = await Classroom.findById(id);
        
        if (!classroom) return res.status(404).json({ error: 'Classroom not found' });
        
        res.status(200).json(classroom);
    } catch (error) {
        next(error);
    }
}

// CREAR CLASE (POST)
const createClassroomController = async (req, res, next) => {
    try {
        const { name } = req.body;
        
        // Validación básica
        if (!name) {
            return res.status(400).json({ error: 'Missing fields (name is required)' });
        }

        // Crea una nueva instancia del modelo y guarda
        const newClassroom = new Classroom(req.body);
        const savedClassroom = await newClassroom.save();
        
        res.status(201).json(savedClassroom);
    } catch (error) {
        next(error);
    }
}

// ACTUALIZAR CLASE (PUT/PATCH)
const updateClassroomController = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Busca y actualiza. { new: true } devuelve el objeto actualizado.
        const updatedClassroom = await Classroom.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedClassroom) return res.status(404).json({ error: 'Classroom not found' });
        
        res.status(200).json(updatedClassroom); // Normalmente updates retornan 200
    } catch (error) {
        next(error);
    }
}

// BORRAR CLASE (DELETE)
const deleteClassroomController = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Busca por ID y elimina
        const deletedClassroom = await Classroom.findByIdAndDelete(id);

        if (!deletedClassroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }

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