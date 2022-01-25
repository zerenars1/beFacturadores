const { findParametro } = require('../../../helpers/findParametros');
const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../config/constants');
const { medio_pago } = require('../../../models');
const { getService } = require('../../../services/Facturadores/servicio.services');

async function formateadorRespuesta(respuesta,body,transaccion_id) {

  const {referencia,servicio_id} = body
  
  if( Array.isArray(respuesta) === false ) {
    respuesta = [respuesta]
  }

    if(respuesta[0].level != 'success' ) {
        switch (respuesta[0].key) {
            case 'Validacion':
              return {
                success: false,
                message: respuesta[0].dsc,
              };
            case 'ServerProcessError':
              return {
                success: false,
                message: `${respuesta[0].dsc} de copaco.`,
              };
            default:
              return {
                success: false,
                message: respuesta[0].dsc,
              };        
        }
    }

    try {

      const servicio = await getService(servicio_id);
      const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
      const cabecera = {
        transaccion_id,
        nombre: respuesta[0].cliente,
        referencia,
        referencia_nombre:'',
        moneda_id: servicio.moneda_id,
        medioPago:[{
          id: efectivo.id,
          nombre: efectivo.nombre,
        }],
        solicitar_factura: false,
      }
  
      const data = {};
      const result = {
        success: true,
      };
      const detalle = [];
      const cuotas = []

      let numero_cuota = 0;
      respuesta.forEach(c => {
        cuotas.push({
          numero_cuota: ++numero_cuota,
          codigo_factura: c.codFactura,
          fecha_vencimiento: c.fecha_vence,
          importe_acumulado: Number(c.total_factura),
          importe_comision: Number(c.comision_iva),
          importe_comision_acumulado: Number(c.comision_iva),
          importe_mora_acumulado:0,
          importe_total_acumulado:Number(c.total_factura),
          importe_minimo_acumulado:0
        })   
      });

      detalle.push({
        operacion: '',
        descripcion: 'Pago de Copaco',
        numero_cuenta: respuesta[0].nro_cuenta,
        cuota: cuotas,
      });

      data.cabecera = cabecera;
      data.detalle = detalle;
      result.data = data;

      return result;
      
    } catch (error) {

      throw new Error('Error al generar las cuotas.');

    }
  }

  module.exports = {
    formateadorRespuesta
  };