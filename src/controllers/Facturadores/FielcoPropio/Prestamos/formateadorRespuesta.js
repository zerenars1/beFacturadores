const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../../config/constants');
const { findParametro } = require('../../../../helpers/findParametros');
const { medio_pago } = require('../../../../models');
const { getService } = require('../../../../services/Facturadores/servicio.services');
const {responseFormatteServices} = require('../../../../services/index')
const  formateadorRespuesta = async (respuesta, body, transaccion_id) => {

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
      nombre:efectivo.nombre
      }
    ],
    solicitar_factura: false
  }


  const operaciones = responseFormatteServices.groupBy(
    respuesta.data.prestamos,
    'operacion'
  );

  const cantidadDeOperaciones = Object.keys(operaciones).length
  const operacionesKey = Object.keys(operaciones);

  const key = operacionesKey.filter(responseFormatteServices.distinct);
  const detalle = [];

  for (let i = 0; i < cantidadDeOperaciones; i++) {
    const cuotas = [];
    operaciones[key[i]].forEach((element) => {
      let acumulado = 0;
      for (let j = 0; j < element.cuotas.length; j++) {
        cuotas.push({
          numero_cuota: element.cuotas[j].numeroCuota,
          fecha_vencimiento: element.cuotas[j].fechaVencimiento.split("/").reverse().join("-"),
          importe_acumulado: element.cuotas[j].montoAPagar + acumulado ,
          importe_comision: 0,
          importe_comision_acumulado: 0,
          importe_mora_acumulado: 0,
          importe_total_acumulado: element.cuotas[j].montoAPagar + acumulado ,
          importe_minimo_acumulado: 0,
        });
        acumulado = element.cuotas[j].montoAPagar + acumulado      
      }
    });

    detalle.push({
      operacion: Number(key[i]),
      descripcion: "Pago de prestamo fielco",
      cuota: cuotas,
    });
  }

  data.cabecera = cabecera;
  data.detalle = detalle;
  result.data = data;
  data.respuesta_facturador = respuesta.data
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
