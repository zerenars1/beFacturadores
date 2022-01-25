module.exports = {
  mensajeDeError(codigoError) {
    switch (codigoError) {
      case 'EW005':
        return {
          success: false,
          message: 'Nis inexistente o Error al recuperar los datos',
        };
      case 'EW105':
        return {
          success: false,
          message: 'Suministro no encontrado',
        };
      case 'EW115':
        return {
          success: false,
          message: 'El suministro no tiene deuda',
        };
      default:
        return {
          success: true,
        };
    }
  },
};
