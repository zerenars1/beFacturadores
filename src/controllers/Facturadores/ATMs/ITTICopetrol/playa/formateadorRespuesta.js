const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../../../config/constants');
const { findParametro } = require('../../../../../helpers/findParametros');
const { medio_pago } = require('../../../../../models');
const { getService } = require('../../../../../services/Facturadores/servicio.services');

async function formateadorRespuesta(cuentas, body, transaccion_id) {
  try {
    const { servicio_id } = body;
    const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
    const servicio = await getService(servicio_id);

    const cabecera = {
      transaccion_id,
      nombre: '',
      referencia: '',
      referencia_nombre: 'NRO_CUENTA',
      moneda_id: servicio.moneda_id,
      medio_pago: [{ id: efectivo.id, nombre: efectivo.nombre }],
      solicitar_factura: false,
    };

    const detalle = [];
    detalle.push({
      numero_cuota: 0,
      descripcion: 'Deposito playa',
      fecha_vencimiento: '',
      importe_acumulado: 0,
      importe_comision: 0,
      importe_comision_acumulado: 0,
      importe_mora_acumulado: 0,
      importe_total_acumulado: 0,
      importe_minimo_acumulado: 0,
    });

    return {
      success: true,
      message: '',
      data: {
        cabecera,
        detalle,
        cuentas
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Error al realizar la consulta',
    };
  }
}

module.exports = {
  formateadorRespuesta,
};
