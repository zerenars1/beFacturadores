const { responseFormatteServices } = require('../../../services/index');
const { getService } = require('../../../services/Facturadores/servicio.services');
const { webServices } = require('../../../services/index');
const { mensajeDeError } = require('./errorMesssage');

async function formateadorRespuesta(respuesta, params) {
  try {
    const { referencia, servicio_id } = params.body;
    const { transaccion_id } = params;

    if (!responseFormatteServices.findVal(respuesta, 'codRespuesta')) {
      return {
        success: false,
        data: {},
        message: 'No se pudo realizar la consulta solicitada',
      };
    }

    if (respuesta.codRespuesta === '00') {
      const servicio = await getService(servicio_id);
      const medioPago = await webServices.getMediosDePago(servicio_id);
      const cabecera = {
        transaccion_id,
        nombre: respuesta.WSNOMB,
        referencia,
        referencia_nombre: '',
        moneda_id: servicio.moneda_id,
        medioPago,
        solicitar_factura: false,
      };

      const data = {};
      const result = {
        success: true,
      };
      const detalle = [];
      const cuotas = [];

      // Cuotas Vencidas
      cuotas.push({
        numero_cuota: 1,
        fecha_vencimiento: `Cuota Vencida: ${respuesta.wsmon1}`,
        importe_acumulado: respuesta.WSMONVTO,
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: respuesta.WSMONVTO,
        importe_minimo_acumulado: 0,
      });
      // Cuotas Pendientes
      cuotas.push({
        numero_cuota: 2,
        fecha_vencimiento: `Cuota Pendiente: ${respuesta.wsmon2}`,
        importe_acumulado: respuesta.WSMONCTA,
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: respuesta.WSMONCTA,
        importe_minimo_acumulado: 0,
      });
      // Deuda Total
      cuotas.push({
        numero_cuota: 3,
        fecha_vencimiento: `Total Deuda: ${respuesta.wsmon3}`,
        importe_acumulado: respuesta.WSMONTOT,
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: respuesta.WSMONTOT,
        importe_minimo_acumulado: 0,
      });

      detalle.push({
        operacion: respuesta.WSOPN,
        descripcion: 'Pago de Cuota',
        cuota: cuotas,
      });

      data.cabecera = cabecera;
      data.detalle = detalle;
      result.data = data;

      return result;
    }
    const result = mensajeDeError(respuesta.codRespuesta);
    return result;
  } catch (error) {
    throw new Error('Error al generar las cuotas.');
  }
}

module.exports = {
  formateadorRespuesta,
};
