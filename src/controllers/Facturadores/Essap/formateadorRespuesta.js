const { mensajeDeError } = require('./errorMesssage');
const {
  MP_MEDIO_EFECTIVO_PARAMETRO,
  MONEDA_LOCAL,
  TX_TIPO_CONSULTA_PARAMETRO,
} = require('../../../config/constants');
const { findParametro } = require('../../../helpers/findParametros');
const { moneda, medio_pago, transaccion_tipo } = require('../../../models');

async function formateadorRespuesta(respuesta, params) {
  try {
    const { transaccion_id } = params;
    const { transaccion_tipo_id, referencia } = params.body;
    const [consulta] = await Promise.all([
      findParametro(TX_TIPO_CONSULTA_PARAMETRO, transaccion_tipo),
    ]);

    const response = await mensajeDeError(respuesta.cod_respuesta, transaccion_tipo_id);

    if (response.success && transaccion_tipo_id === consulta.id) {
      const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
      const currency = await findParametro(MONEDA_LOCAL, moneda);

      const {
        vencimiento,
        total_pagar,
        comision,
        nombre_cliente,
        id_essap,
        aviso_sec,
        tipo_deuda,
      } = respuesta.registros[0];

      const deudaAnterior = 0;

      const data = {};
      const result = {
        success: true,
      };

      const cabecera = {
        transaccion_id,
        nombre: nombre_cliente,
        referencia,
        referencia_nombre: '',
        moneda_id: currency.id,
        medio_pago: [
          {
            id: efectivo.id,
            nombre: efectivo.nombre,
          },
        ],
        aviso_princ: respuesta.aviso_princ,
        solicitar_factura: false,
      };

      const detalle = [];
      const cuotas = [];
      let numeroCuota = 0;

      cuotas.push({
        numero_cuota: ++numeroCuota,
        fecha_vencimiento: vencimiento,
        importe_acumulado: total_pagar - deudaAnterior,
        importe_comision: comision,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: total_pagar - deudaAnterior + comision,
        importe_minimo_acumulado: 0,
      });

      detalle.push({
        operacion: [respuesta.id_consulta, id_essap],
        descripcion: 'Pago de Essap',
        cuota: cuotas,
        tipo_deuda,
        aviso_sec,
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
