const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../../config/constants');
const { findParametro } = require('../../../../helpers/findParametros');
const { medio_pago } = require('../../../../models');
const { getService } = require('../../../../services/Facturadores/servicio.services');

async function formateadorRespuesta(respuesta, body, transaccion_id) {
  try {
    const { servicio_id } = body;
    const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
    const servicio = await getService(servicio_id);
    const { titular, numeroDocumentoTitular, extraccion } = respuesta;

    const cabecera = {
      transaccion_id,
      nombre: titular,
      referencia: numeroDocumentoTitular,
      referencia_nombre: servicio.consulta_referencia,
      moneda_id: servicio.moneda_id,
      medio_pago: [{ id: efectivo.id, nombre: efectivo.nombre }],
      solicitar_factura: false,
      solicitar_pin: true
    };

    const detalle = [{
      operacion: '',
      descripcion: `EXTRACCION CUENTA ${extraccion.cuenta.moneda.simbolo} NRO. ${extraccion.cuenta.numeroCuenta}`,
      cuota: [
        {
          numero_cuota: 1,
          fecha_vencimiento: '',
          importe_acumulado: Number(extraccion.montoExtraccion),
          importe_comision: 0,
          importe_comision_acumulado: 0,
          importe_mora_acumulado: 0,
          importe_total_acumulado: Number(extraccion.montoExtraccion),
          importe_minimo_acumulado: 0,
        }
      ]
    }];

    return {
      success: true,
      message: 'Verificacion de cuenta exitosa',
      data: {
        cabecera,
        detalle,
        respuesta_facturador: respuesta
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Error al formatear respuesta',
    };
  }
}

module.exports = {
  formateadorRespuesta
};
