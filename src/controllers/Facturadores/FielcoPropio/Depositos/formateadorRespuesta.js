const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../../config/constants');
const { findParametro } = require('../../../../helpers/findParametros');
const { medio_pago } = require('../../../../models');
const { getService } = require('../../../../services/Facturadores/servicio.services');

async function formateadorRespuesta(respuesta, body, transaccion_id) {
  try {
    const { servicio_id } = body;
    const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
    const servicio = await getService(servicio_id);
    const { cuentas, deposito, deposito: { cuentaSubcuenta } } = respuesta;

    const cabecera = {
      transaccion_id,
      nombre: cuentas.titular,
      referencia: cuentas.numeroDocumentoTitular,
      referencia_nombre: servicio.consulta_referencia,
      moneda_id: servicio.moneda_id,
      medio_pago: [{ id: efectivo.id, nombre: efectivo.nombre }],
      solicitar_factura: false,
    };

    const detalle = [{
      operacion: '',
      descripcion: `DEPOSITO EN CUENTA ${cuentaSubcuenta.moneda.simbolo} NRO. ${cuentaSubcuenta.numeroCuenta}`,
      cuota: [
        {
          numero_cuota: 1,
          fecha_vencimiento: '',
          importe_acumulado: Number(deposito.monto),
          importe_comision: 0,
          importe_comision_acumulado: 0,
          importe_mora_acumulado: 0,
          importe_total_acumulado: Number(deposito.monto),
          importe_minimo_acumulado: 0,
        }
      ]
    }];

    return {
      success: true,
      message: 'Verificacion de cuenta exitosa',
      data: {
        cabecera,
        detalle,
        respuesta_facturador: respuesta
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Error al formatear respuesta',
    };
  }
}

module.exports = {
  formateadorRespuesta
};
