const { v4: uuidv4 } = require('uuid');
const {readCSV, writeCSV} = require('../csv');

const listPersons = () => {
    return readCSV('persons');
}

const getPerson = (id) => {
    return readCSV("persons").find(p => p.id === id);
}

const createPerson = (attrs) => {
    const { name, surname, is_teacher, birthdate } = attrs;
    const persons = readCSV("persons");
    const newPerson = {
        id: uuidv4(),
        name,
        surname,
        is_teacher: is_teacher || 'false',
        birthdate
    };

    persons.push(newPerson);
    writeCSV("persons", persons);
    return newPerson;
}

const updatePerson = (id, attrs) => {
    const { name, surname, is_teacher, birthdate } = attrs;
    let persons = readCSV("persons");
    const index = persons.findIndex(p => p.id === id);

    persons[index] = {
        ...persons[index],
        name: name || persons[index].name,
        surname: surname || persons[index].surname,
        is_teacher: is_teacher !== undefined ? is_teacher : persons[index].is_teacher,
        birthdate: birthdate || persons[index].birthdate
    };

    writeCSV("persons", persons)
    return persons[index];
}

const deletePerson = (id) => {
    let persons = readCSV("persons");
    const filteredPersons = persons.filter(p => p.id !== id);
    writeCSV("persons", filteredPersons); 
}

module.exports = { listPersons, getPerson, createPerson, updatePerson, deletePerson };