module.exports = {
  async mensajeDeError(codigoError) {
    // Consulta
    switch (codigoError) {
      case '01':
        return {
          success: false,
          message: 'Número de cedula incorrecto o no existe',
        };
      case '02':
        return {
          success: false,
          message: 'No existe el número de operación a pagar',
        };
      case '03':
        return {
          success: false,
          message: 'No se encuentra nro. de movimiento a anular',
        };
      case '04':
        return {
          success: false,
          message: 'Contraseña incorrecta',
        };
      case '05':
        return {
          success: false,
          message: 'Usuario Incorrecto',
        };

      case '06':
        return {
          success: false,
          message: 'El monto a pagar es superior al total de la deuda',
        };
      case '07':
        return {
          success: false,
          message: 'No existe deuda para el numero de cedula',
        };
      case '08':
        return {
          success: false,
          message: 'Hubo un error en el cálculo de comisión',
        };
      case '09':
        return {
          success: false,
          message: 'Procedimiento de anulación no válido',
        };
      case '11':
        return {
          success: false,
          message: 'No se encontró fecha de caja',
        };
      case '12':
        return {
          success: false,
          message: 'La fecha operativa no corresponde',
        };
      case '13':
        return {
          success: false,
          message: 'Usuario no Autorizado',
        };
      case '14':
        return {
          success: false,
          message: 'Debe ingresar el importe a pagar',
        };
      case '15':
        return {
          success: false,
          message: 'El importe a abonar no corresponde a un número válido',
        };
      case '16':
        return {
          success: false,
          message: 'La operación se encuentra bloqueada por administración',
        };
      case '17':
        return {
          success: false,
          message: 'Op. pendiente de confirmación de extorno',
        };
      case '18':
        return {
          success: false,
          message: 'El movimiento ya se encuentra extornado',
        };
      case '19':
        return {
          success: false,
          message: 'No se encuentra el nro. de movimiento',
        };
      case '20':
        return {
          success: false,
          message: 'No se encuentra el serial de programa',
        };
      default:
        return {
          success: true,
          message: 'Éxito',
        };
    }
  },
};
