const { listPersons, getPerson, createPerson, updatePerson, deletePerson } = require('../models/personsModel');

const listPersonsController = (req, res, next) => {
    try {
        const persons = listPersons();
        res.status(200).json(persons);
    } catch (error) {
        next(error);
    }
}

const getPersonController = (req, res, next) => {
    try {
        const person = getPerson(req.params.id);
        if (!person) return res.status(404).json({ error: 'Person not found' });
        res.status(200).json(person);
    } catch (error) {
        next(error);
    }
}

const createPersonController = (req, res, next) => {
    try {
        const { name, surname, is_teacher, birthdate } = req.body;
        if (!name || !surname || !birthdate) {
            return res.status(400).json({ error: 'Missing fields' });
        }
        res.status(201).json(createPerson(req.body));
    } catch (error) {
        next(error);
    }
}

const updatePersonController = (req, res, next) => {
    try {
        const person = getPerson(req.params.id);
        if (!person) return res.status(404).json({ error: 'Person not found' });
        res.status(201).json(updatePerson(req.params.id, req.body));
    } catch (error) {
        next(error);
    }
}

const deletePersonController = (req, res, next) => {
    try {
        const person = getPerson(req.params.id);

        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }

        deletePerson(req.params.id)
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