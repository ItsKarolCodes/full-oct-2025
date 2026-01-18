require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


const dbURI = process.env.MONGO_URI; 

mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to Atlas:', err));

// ... (El resto de tus routers y middlewares está perfecto, déjalo igual) ...
// Routers
const indexRouter = require('./routers/indexRouters');
const personsRouter = require('./routers/personsRouters');
const classroomsRouter = require('./routers/classroomRouters');

// Middlewares
const logger = require('./middlewares/logs');
const notFound = require('./middlewares/404');
const internalServerError = require('./middlewares/500');
// const auth = require('./middlewares/auth'); // lo dejo comentado ya que no lo estoy utilizando

app.use(express.json());
app.use(cors());

app.use('/', indexRouter);
app.use('/persons', personsRouter);
app.use('/classrooms', classroomsRouter);

app.use(notFound);
app.use(internalServerError);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});