const { responseFormatteServices } = require('../../../services/index');
const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../config/constants');
const { findParametro } = require('../../../helpers/findParametros');
const { medio_pago } = require('../../../models');

async function formateadorRespuesta(respuesta, referencia, transaccion_id) {
  if (!responseFormatteServices.findVal(respuesta, 'codretorno')) {
    return {
      success: false,
      data: {},
      message: 'No se pudo realizar la consulta solicitada',
    };
  }

  try {
    if (responseFormatteServices.findVal(respuesta, 'codretorno') === '000') {
      const data = {};
      const result = {
        success: true,
      };

      const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);

      const detalles = respuesta.detalle.detalle_consulta;

      const cabecera = {
        transaccion_id,
        nombre: responseFormatteServices.findVal(respuesta, 'nombreapellido'),
        referencia,
        referencia_nombre: responseFormatteServices.findVal(respuesta, 'desretorno'),
        moneda_id: responseFormatteServices.findVal(respuesta.detalle.detalle_consulta, 'moneda'),
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
        numero_cuota: 0,
        fecha_vencimiento: detalles.fecha_vencimiento,
        importe_acumulado: detalles.monto_vencido,
        importe_comision: detalles.comision,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: detalles.monto_a_vencer,
        importe_minimo_acumulado: 0,
      });

      detalle.push({
        operacion: '',
        descripcion: responseFormatteServices.findVal(
          respuesta.detalle.detalle_consulta,
          'concepto'
        ),
        cuota: cuotas,
      });

      data.cabecera = cabecera;
      data.detalle = detalle;

      result.data = data;
      return result;
    }

    return {
      success: false,
      message: JSON.parse(
        JSON.stringify(responseFormatteServices.findVal(respuesta, 'desRetorno')[0])
      ),
    };
  } catch (error) {
    throw new Error();
  }
}

module.exports = {
  formateadorRespuesta,
};
