const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../../config/constants');
const { findParametro } = require('../../../../helpers/findParametros');
const { medio_pago } = require('../../../../models');
const { getService } = require('../../../../services/Facturadores/servicio.services');

const formateadorRespuesta = async (respuesta, body, transaccion_id) => {
  try {
    const { referencia, servicio_id } = body;
    const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
    const servicio = await getService(servicio_id);

    const data = {};
    const result = {
      success: true
    };

    const cabecera = {
      transaccion_id,
      nombre: `${respuesta.data.nombres} ${respuesta.data.apellidos}`,
      referencia,
      referencia_nombre: '',
      moneda_id: servicio.moneda_id,
      medio_pago: [
        {
          id: efectivo.id,
          nombre: efectivo.nombre
        }
      ],
      solicitar_factura: false
    }

    const detalle = [];
    const cuotas = [];
    numeroCuota = 0
    respuesta.data.tarjetas.forEach((t) => {
      cuotas.push({
        numero_cuota: ++numeroCuota,
        fecha_vencimiento: t.fechaUltVencimiento,
        importe_acumulado: t.deudaTotal,
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: t.deudaTotal,
        importe_minimo_acumulado: t.pagoMinimo,
      });
    })

    detalle.push({
      operacion: '',
      descripcion: 'Pago de tarjeta Fielco',
      numero_cuenta: respuesta.data.numeroCuenta,
      cuota: cuotas,

    });

    data.cabecera = cabecera;
    data.detalle = detalle;
    data.r_fielco = respuesta.data;

    result.data = data;
    return result;

  } catch (error) {
    return {
      success: false,
      message: `La consulta no pudo realizarse \n${error.message}`,
    };
  }

}

module.exports = {
  formateadorRespuesta,
};
