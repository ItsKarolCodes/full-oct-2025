const mongoose = require('mongoose');

// Definimos el esquema
const personSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    surname: { 
        type: String, 
        required: true 
    },
    birthdate: { 
        type: Date 
    },
    isTeacher: { 
        type: Boolean, 
        default: false 
    }
}, { 
    
    collection: 'people',
    timestamps: true 
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});


module.exports = mongoose.model('Person', personSchema);