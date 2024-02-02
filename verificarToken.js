const jwt = require('jsonwebtoken');
const FirmaJWT = process.env.FIRMA_JWT;

const verifyToken = (req, res, next) => {
  const token = req.get('Authorization').trim();

  if (!token) {
    return res.status(401).json({ msg: 'Acceso denegado. Token no proporcionado.' });
  }

  console.log('Token recibido:', token);

  try {
    const decoded = jwt.verify(token, FirmaJWT);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = verifyToken;