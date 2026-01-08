const auth = (req, res, next) => {
    if (req.headers.authorization !== 'Bearer sdkfhgjshdrupywt843yhotgiakenlgjkld') {
        return res.status(401).json({ error: 'Unauthorized', message: 'Token inválido o ausente' });
    }
    next();
};

module.exports = auth;