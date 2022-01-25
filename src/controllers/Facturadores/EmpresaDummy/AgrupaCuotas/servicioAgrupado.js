const { formateadorRespuesta } = require('./formateadorRespuesta');
const { buildTicketBody } = require('../../../Operaciones/ticketCustom.controllers');
const { consultaServices } = require('../../../../services/index');

async function consulta(params) {
  try {
    return formateadorRespuesta({}, params.body, params.transaccion_id);
  } catch (error) {
    return {
      success: false,
      data: {},
      message: `No se pudo realizar la consulta solicitada\n${error.message}`,
    };
  }
}

async function pago(params) {
  const transaccionPadre = await consultaServices.getTransaccionPadre(params.transaccion_padre_id);
  const { numero_cuota, fecha_vencimiento } = params.body;
  try {
    const ticket = await buildTicketBody({
      transaccionPadreId: params.transaccion_padre_id,
      fechaVencimiento: fecha_vencimiento,
      referenciaString: 'NRO_DOCUMENTO',
      referencia: params.body.referencia,
    });
    return {
      success: true,
      message: 'Éxito',
      data: {
        ticket,
        referencia: params.body.referencia,
        transaccionFacturador: 0,
        response: {}
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `La operacion no pudo realizarse \n${error.message}`,
      data: {},
    };
  }
}

module.exports = {
  pago,
  consulta
};
