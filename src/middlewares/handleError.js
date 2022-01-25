// eslint-disable-next-line no-unused-vars
module.exports = function handleError(err, req, res, next) {
  console.log('Fecha del Error: ', new Date());
  console.log('Host:', req.headers.host);
  console.log('Ip:', req.headers.ip);
  console.log('Body:', req.body);
  console.log('Err Name:', err.name);
  console.log('Err Msg:', err.message);
  console.log('Stack Error: ', err.stack);

  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }
  switch (err.name) {
    case 'SequelizeValidationError':
      // 415  error relacionado a Sequelize (BD)
      return res.status(415).json({
        success: false,
        message: `Ocurrio un error inesperado. Mensaje: ${err.errors[0].message}`,
        error: err.message,
      });
    case 'SequelizeForeignKeyConstraintError':
      return res.status(420).json({
        success: false,
        message: `No se pudo eliminar el registro porque guarda relación con otro. Mensaje: ${err.message}`,
        error: err.message,
      });
    case 'SequelizeUniqueConstraintError':
      return res.status(415).json({
        success: false,
        message: `Ya existe un registro con las mismas relaciones. Mensaje: ${err.message}`,
        error: err.message,
      });
    case 'SequelizeDatabaseError':
      return res.status(415).json({
        success: false,
        message: `Ocurrió un error inesperado. Mensaje: ${err.message}`,
        error: err.message,
      });
    default:
      return res.status(500).json({
        success: false,
        message: `Ocurrio un error inesperado. Mensaje: ${err.message}`,
        error: err.message,
      });
  }
};
