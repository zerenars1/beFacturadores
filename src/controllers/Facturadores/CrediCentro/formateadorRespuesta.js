const { responseFormatteServices } = require('../../../services/index');

function formateadorRespuesta(respuesta, referencia, transaccion_id) {
  if (!responseFormatteServices.findVal(respuesta, 'codRetorno')) {
    return {
      success: false,
      data: {},
      message: 'No se pudo realizar la consulta solicitada',
    };
  }

  try {
    if (responseFormatteServices.findVal(respuesta, 'codRetorno')[0] === '000') {
      const cabecera = {
        transaccion_id,
        nombre: responseFormatteServices.findVal(respuesta, 'nombreApellido')[0],
        referencia,
        referencia_nombre: responseFormatteServices.findVal(respuesta, 'respConsultaDet')[0]
          .desOperacion[0],
        moneda_id: responseFormatteServices.findVal(respuesta, 'moneda')[0],
        medio_pago: [
          {
            id: 1,
            nombre: 'Efectivo',
          },
        ],
        solicitar_factura: false,
      };

      const operaciones = responseFormatteServices.groupBy(
        respuesta.root.Detalle[0].respConsultaDet,
        'nroOperacion'
      );
      const {
        operacionesKey,
        cantidadDeOperaciones,
      } = responseFormatteServices.operacionesAgrupadas();

      const detalle = [];
      const key = operacionesKey.filter(responseFormatteServices.distinct);

      for (let i = 0; i < cantidadDeOperaciones; i++) {
        const cuotas = [];
        operaciones[key[i]].forEach((element) => {
          cuotas.push({
            numero_cuota: element.nroCuota[0],
            fecha_vencimiento: element.fechaVencimiento[0],
            importe_acumulado: 0,
            importe_comision: 0,
            importe_comision_acumulado: 0,
            importe_mora_acumulado: 0,
            importe_total_acumulado: responseFormatteServices.insertDecimal(element.totalCuota),
            importe_minimo_acumulado: 0,
          });
        });
        detalle.push({
          operacion: key[i],
          descripcion: responseFormatteServices.findVal(respuesta, 'respConsultaDet')[0]
            .desOperacion[0],
          cuota: cuotas,
        });
      }

      responseFormatteServices.reiniciarValoresAuxiliares();

      const result = {
        success: true,
        message: 'OK',
        data: { cabecera, detalle },
      };

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
