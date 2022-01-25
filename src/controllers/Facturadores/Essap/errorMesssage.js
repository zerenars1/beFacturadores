const {
  TX_TIPO_PAGO_PARAMETRO,
  TX_TIPO_CONSULTA_PARAMETRO,
  TX_TIPO_AUTOREVERSA_PARAMETRO,
} = require('../../../config/constants');
const { findParametro } = require('../../../helpers/findParametros');
const { transaccion_tipo } = require('../../../models');

module.exports = {
  async mensajeDeError(codigoError, tipoOperacion) {
    const [consulta, pago, reversa] = await Promise.all([
      findParametro(TX_TIPO_CONSULTA_PARAMETRO, transaccion_tipo),
      findParametro(TX_TIPO_PAGO_PARAMETRO, transaccion_tipo),
      findParametro(TX_TIPO_AUTOREVERSA_PARAMETRO, transaccion_tipo),
    ]);
    if (tipoOperacion === consulta.id) {
      // Consulta
      switch (codigoError) {
        case '001':
          return {
            success: false,
            message: 'No hay deuda pendiente',
          };
        case '002':
          return {
            success: false,
            message: 'La deuda pendiente debe ser abonada en la Essap (1: pago Essap)',
          };
        case '003':
          return {
            success: false,
            message: 'La deuda ya no está pendiente(3: pagado)',
          };
        case '005':
          return {
            success: false,
            message: 'La cuenta está en proceso de facturación (2: en proceso)',
          };
        case '901':
          return {
            success: false,
            message: 'No existe el ISSAN indicado',
          };

        case '902':
          return {
            success: false,
            message: 'No existe el Comprobante indicado',
          };
        case '903':
          return {
            success: false,
            message: 'El Comprobante no es correcto',
          };
        case '904':
          return {
            success: false,
            message: 'Error en los parámetro',
          };
        case '990':
          return {
            success: false,
            message: 'Error de autenticación',
          };
        case '999':
          return {
            success: false,
            message: 'Error no identificado',
          };
        default:
          return {
            success: true,
          };
      }
    } else if (tipoOperacion === pago.id) {
      // Pago
      switch (codigoError) {
        case '901':
          return {
            success: false,
            message: 'No existe la Operación',
          };
        case '902':
          return {
            success: false,
            message: 'La Operación ya fue pagada antes',
          };
        case '903':
          return {
            success: false,
            message: 'La operación no puede ser pagada',
          };
        case '904':
          return {
            success: false,
            message: 'Error en los parámetro',
          };
        case '905':
          return {
            success: false,
            message: 'Error con las fechas',
          };
        case '990':
          return {
            success: false,
            message: 'Error de autenticación',
          };
        case '999':
          return {
            success: false,
            message: 'Error no identificado',
          };
        default:
          return {
            success: true,
          };
      }
    } else if (tipoOperacion === reversa.id) {
      // Anulacion
      switch (codigoError) {
        case '901':
          return {
            success: false,
            message: 'No existe la Operación',
          };
        case '902':
          return {
            success: false,
            message: 'La Operación ya fue anulada antes',
          };
        case '903':
          return {
            success: false,
            message: 'La operación no puede ser anulada',
          };
        case '904':
          return {
            success: false,
            message: 'Error en los parámetro',
          };
        case '905':
          return {
            success: false,
            message: 'Error con las fechas',
          };
        case '990':
          return {
            success: false,
            message: 'Error de autenticación',
          };
        case '999':
          return {
            success: false,
            message: 'Error no identificado',
          };
        default:
          return {
            success: true,
          };
      }
    }
  },
};
