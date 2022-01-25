const { buildTicketBody } = require('../../../Operaciones/ticketCustom.controllers');

async function pago(params) {
  const { monto_recibido } = params.body;

  if (monto_recibido < 1000) throw new Error('Solo se aceptan montos desde 1000 gs');
  if (params.body.referencia.length < 10) throw new Error('Referencia no valida');

  try {
    const ticket = await buildTicketBody({
      transaccionPadreId: params.transaccion_padre_id,
      referenciaString: 'NRO. CELULAR',
      referencia: params.body.referencia,
    });

    return {
      success: true,
      message: `Éxito, referencia pago: ${params.transaccion_padre_id}`,
      data: {
        ticket,
        referencia: params.transaccion_padre_id,
      }
    };
  } catch (e) {
    return {
      success: false,
      message: e.message,
      data: {
        response: e.response.data
      }
    };
  }
}

module.exports = { pago };
