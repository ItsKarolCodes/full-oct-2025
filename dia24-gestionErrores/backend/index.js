require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// Routers
const indexRouter = require('./routers/indexRouters');
const personsRouter = require('./routers/personsRouters');
const classroomsRouter = require('./routers/classroomRouters');

// Middlewares
const logger = require('./middlewares/logs');
const notFound = require('./middlewares/404');
const internalServerError = require('./middlewares/500');
const auth = require('./middlewares/auth');

app.use(express.json());
app.use(cors());
app.use(logger);

// Rutas
app.use('/', indexRouter);
app.use('/persons', personsRouter);
app.use('/classrooms', classroomsRouter);

// Middleware para rutas no encontradas
app.use(notFound);
app.use(internalServerError);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});