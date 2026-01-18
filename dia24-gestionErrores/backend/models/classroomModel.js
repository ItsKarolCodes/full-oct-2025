const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    
    teacher_id: { 
        type: String,
        required: false
    },

    students: [{ 
        type: String 
    }]
}, { 
    collection: 'classrooms', 
    timestamps: true 
});

classroomSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Classroom', classroomSchema);