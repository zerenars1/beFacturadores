const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../../config/constants');
const { findParametro } = require('../../../../helpers/findParametros');
const { medio_pago } = require('../../../../models');

const { getService } = require('../../../../services/Facturadores/servicio.services');

async function formateadorRespuesta(respuesta, body, transaccion_id) {
  if (respuesta.error) {
    return {
      success: false,
      message: 'No se pudo realizar la consulta solicitada',
    };
  }

  try {
    const response = true;
    if (response) {
      const { referencia, servicio_id } = body;
      const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);

      const servicio = await getService(servicio_id);

      const { nombre } = respuesta;

      const data = {};
      const result = {
        success: true,
      };

      const cabecera = {
        transaccion_id,
        nombre,
        referencia,
        referencia_nombre: '',
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
        numero_cuota: respuesta.cuotaNro,
        fecha_vencimiento: respuesta.fechaVencimiento,
        importe_acumulado: respuesta.deuda,
        importe_comision: respuesta.cargo,
        importe_comision_acumulado: respuesta.cargo,
        importe_mora_acumulado: 0,
        importe_total_acumulado: respuesta.monto,
        importe_minimo_acumulado: 0,
      });

      detalle.push({
        operacion: '',
        descripcion: 'Pago de Ande',
        cuota: cuotas,
      });

      data.cabecera = cabecera;
      data.detalle = detalle;

      result.data = data;
      return result;
    }
    return response;
  } catch (error) {
    throw new Error();
  }
}

module.exports = {
  formateadorRespuesta,
};
