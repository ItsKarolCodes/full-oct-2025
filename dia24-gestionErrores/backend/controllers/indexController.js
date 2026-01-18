const indexController = (req, res, next) => {
    try {
        //1. La respuesta va dentro del try
        res.status(200).json({ message: 'Welcome to the Classroom Management API' });
    } catch (error) {
        // 2. Capturamos cualquier error posible
        next(error);
    }
}

module.exports = indexController;