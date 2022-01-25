const getErrorMessage = (data) => {
  let message;
  if (typeof data.response !== 'undefined') {
    switch (data.response.code) {
      case -1:
        message = 'Tipo de consulta desconocida';
        break;
      case 1:
        message = 'El deposito ya existe';
        break;
      case 2:
        message = 'Deposito cancelado';
        break;
      case 4:
        message = '"No es posible deshacer el depósito",';
        break;
      case 5:
        message = 'La cuenta no existe';
        break;
      case 6:
        message = 'Moneda incorrecta';
        break;
      case 10:
        message = 'Parámetros faltantes / no válidos';
        break;
      case 11:
        message = 'Número de transacción no válido';
        break;
      case 12:
        message = 'Número de transacción duplicado';
        break;
      case 46:
        message = 'Importe no válido';
        break;
      case 299:
        message = 'Código hash incorrecto';
        break;
      case 399:
        message = 'Error interno';
        break;
      default:
        message = 'La operacion no pudo realizarse, error no especificado';
    }
  } else {
    message = 'La operacion no pudo realizarse, servicio no disponible';
  }
  return message;
};

module.exports = { getErrorMessage };
