const { mensajeDeError } = require('./errorMesssage');
const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../config/constants');
const { findParametro } = require('../../../helpers/findParametros');
const { medio_pago } = require('../../../models');

const { getService } = require('../../../services/Facturadores/servicio.services');

async function formateadorRespuesta(respuesta, body, transaccion_id) {
  if (respuesta.error) {
    return {
      success: false,
      message: 'No se pudo realizar la consulta solicitada',
    };
  }

  try {
    const response = mensajeDeError(respuesta.resultado.codigoError);
    if (response.success) {
      const { referencia, servicio_id } = body;
      const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);

      const servicio = await getService(servicio_id);

      const { nombre, apellido1, apellido2 } = respuesta.resultado;

      const nameAndSurname = `${nombre} ${apellido1} ${apellido2}`;

      const data = {};
      const result = {
        success: true,
      };

      const cabecera = {
        transaccion_id,
        nombre: nameAndSurname,
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
      let numeroCuota = respuesta.resultado.recibos.length;

      respuesta.resultado.recibos.forEach((r) => {
        cuotas.push({
          numero_cuota: numeroCuota--,
          fecha_vencimiento: r.fechaVencimiento,
          importe_acumulado: r.importeTotal,
          importe_comision: r.comision,
          importe_comision_acumulado: r.comision,
          importe_mora_acumulado: 0,
          importe_total_acumulado: r.importeTotal + r.comision,
          importe_minimo_acumulado: 0,
        });
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
