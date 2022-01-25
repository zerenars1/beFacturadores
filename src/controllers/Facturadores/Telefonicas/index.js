const bdJson = require('./bd');
const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../config/constants');
const { findParametro } = require('../../../helpers/findParametros');
const { medio_pago } = require('../../../models');
const { buildTicketBody } = require('../../Operaciones/ticketCustom.controllers');
const { getService } = require('../../../services/Facturadores/servicio.services');

const consulta = async (params) => {
  const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);

  const response = bdJson(params.body.referencia);
  if (response.success) {
    const data = {};
    const result = {
      success: true,
    };

    const { nombre, numero_celular, vencimiento, monto } = response.data;

    const servicio = await getService(params.body.servicio_id);

    const cabecera = {
      transaccion_id: params.transaccion_id,
      nombre,
      referencia: numero_celular,
      referencia_nombre: 'Número celular',
      moneda_id: servicio.moneda_id,
      medio_pago: [
        {
          id: efectivo.id,
          nombre: efectivo.nombre,
        },
      ],
      solicitar_factura: false,
    };

    const detalle = [];
    const cuotas = [];

    cuotas.push({
      numero_cuota: 1,
      fecha_vencimiento: vencimiento,
      importe_acumulado: monto,
      importe_comision: 0,
      importe_comision_acumulado: 0,
      importe_total_acumulado: monto,
      importe_minimo_acumulado: 0,
    });

    detalle.push({
      operacion: 1,
      descripcion: 'Pago Telefónica',
      cuota: cuotas,
    });

    data.cabecera = cabecera;
    data.detalle = detalle;

    result.data = data;
    return result;
  }

  return response;
};

async function pago(params) {
  try {
    const obj = {
      transaccionPadreId: params.transaccion_padre_id,
      fechaVencimiento: params.body.fecha_vencimiento,
      referenciaString: 'Número de Teléfono',
      referencia: params.body.referencia,
    };

    const ticket = await buildTicketBody(obj);

    const result = {
      success: true,
      message: 'Éxito',
      data: {
        ticket,
        referencia: params.body.referencia,
      },
    };

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { consulta, pago };
