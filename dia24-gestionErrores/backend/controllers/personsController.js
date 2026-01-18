// Asegúrate de que esta ruta apunte a tu modelo de Mongoose correctamente
const Person = require('../models/personsModel');

// 1. LISTAR PERSONAS (GET)
const listPersonsController = async (req, res, next) => {
    try {
        const persons = await Person.find(); 
        res.status(200).json(persons);
    } catch (error) {
        next(error);
    }
}

// 2. OBTENER UNA PERSONA (GET /:id)
const getPersonController = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const person = await Person.findById(id); 

        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.status(200).json(person);
    } catch (error) {
        next(error);
    }
}

// 3. CREAR PERSONA (POST)
const createPersonController = async (req, res, next) => {
    try {
        const { name, surname, birthdate } = req.body;
        
        // Validación básica
        if (!name || !surname) {
            return res.status(400).json({ error: 'Missing fields (name, surname)' });
        }

        const newPerson = new Person(req.body);
        const personSaved = await newPerson.save();

        res.status(201).json(personSaved);
    } catch (error) {
        next(error);
    }
}

// 4. ACTUALIZAR PERSONA (PUT / PATCH)
const updatePersonController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedPerson = await Person.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }
        
        res.status(200).json(updatedPerson); 
    } catch (error) {
        next(error);
    }
}

// 5. BORRAR PERSONA (DELETE)
const deletePersonController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedPerson = await Person.findByIdAndDelete(id);

        if (!deletedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }

        res.json({ message: 'Person deleted' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listPersonsController,
    getPersonController,
    createPersonController,
    updatePersonController,
    deletePersonController
};