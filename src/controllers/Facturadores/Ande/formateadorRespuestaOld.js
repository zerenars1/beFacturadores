const { mensajeDeError } = require('./errorMesssage');
const { MP_MEDIO_EFECTIVO_PARAMETRO, MONEDA_LOCAL } = require('../../../config/constants');
const { findParametro } = require('../../../helpers/findParametros');
const { moneda, medio_pago } = require('../../../models');

async function formateadorRespuesta(respuesta, referencia, transaccion_id) {
  if (respuesta.error) {
    return {
      success: false,
      message: 'No se pudo realizar la consulta solicitada',
    };
  }

  try {
    const response = mensajeDeError(respuesta.resultado.codigoError);
    if (response.success) {
      const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
      const currency = await findParametro(MONEDA_LOCAL, moneda);

      const {
        fechaVencimiento,
        deudaAnterior,
        comisionAnterior,
        importeTotal,
        importeComision,
        nombre,
        apellido1,
        apellido2,
      } = respuesta.resultado;

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
        moneda_id: currency.id,
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
      let numeroCuota = 0;
      if (respuesta.resultado.deudaAnterior > 0) {
        cuotas.push({
          numero_cuota: ++numeroCuota,
          fecha_vencimiento: fechaVencimiento,
          importe_acumulado: deudaAnterior,
          importe_comision: comisionAnterior,
          importe_comision_acumulado: 0,
          importe_mora_acumulado: 0,
          importe_total_acumulado: deudaAnterior + comisionAnterior,
          importe_minimo_acumulado: 0,
        });
      }

      cuotas.push({
        numero_cuota: ++numeroCuota,
        fecha_vencimiento: fechaVencimiento,
        importe_acumulado: importeTotal,
        importe_comision: importeComision,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: importeTotal + importeComision,
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
