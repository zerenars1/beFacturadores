const { getCuentasAtms } = require('../../../../../services/Facturadores/ATMs/cuentas.service');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const { buildTicketBody } = require('../../../../Operaciones/ticketCustom.controllers');

const consulta = async (params) => {
  try {
    const cuentas = await getCuentasAtms();
    return formateadorRespuesta(cuentas, params.body, params.transaccion_id);
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

const pago = async (params) => {
  try {
    const { importe_total_acumulado, monto_recibido } = params.body;
    if (monto_recibido <= 0) {
      throw new Error('El monto_recibido deben ser mayor a cero');
    }
    if (importe_total_acumulado !== monto_recibido) {
      throw new Error('El importe importe_total_acumulado y el monto_recibido deben ser iguales');
    }

    const ticket = await buildTicketBody({
      transaccionPadreId: params.transaccion_padre_id,
      referenciaString: 'NRO. CUENTA',
      referencia: params.body.referencia,
    });

    return {
      success: true,
      message: 'Éxito',
      data: {
        ticket,
        referencia: params.body.referencia,
      },
    };
  } catch (e) {
    return {
      success: false,
      message: e.message,
    };
  }
};

module.exports = { consulta, pago };
