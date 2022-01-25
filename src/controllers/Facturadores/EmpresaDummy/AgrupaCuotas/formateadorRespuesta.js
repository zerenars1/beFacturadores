async function formateadorRespuesta(respuesta, body, transaccion_id) {
  if (Number(body.referencia) < 4000001 || Number(body.referencia) > 4000003) {
    return {
      success: false,
      message: 'El cliente no posee deudas',
    };
  }

  const cuotas = {
    4000001: [
      {
        operacion: '2-8917323',
        descripcion: 'GONZALEN, MARCOS',
        cuota: [
          {
            numero_cuota: 1,
            fecha_vencimiento: '10/01/2022',
            importe_acumulado: '1000000',
            importe_comision: 0,
            importe_comision_acumulado: 0,
            importe_mora_acumulado: 0,
            importe_total_acumulado: '1000000',
            importe_minimo_acumulado: 0
          }
        ]
      }
    ],

    4000002: [{
      operacion: '2-8917323',
      descripcion: 'GONZALEN, MARCOS',
      cuota: [
        {
          numero_cuota: 1,
          fecha_vencimiento: '10/01/2022',
          importe_acumulado: '200000',
          importe_comision: 0,
          importe_comision_acumulado: 0,
          importe_mora_acumulado: 0,
          importe_total_acumulado: '200000',
          importe_minimo_acumulado: 0
        },
        {
          numero_cuota: 1,
          fecha_vencimiento: '10/02/2022',
          importe_acumulado: '200000',
          importe_comision: 0,
          importe_comision_acumulado: 0,
          importe_mora_acumulado: 0,
          importe_total_acumulado: '200000',
          importe_minimo_acumulado: 0
        },
        {
          numero_cuota: 1,
          fecha_vencimiento: '10/03/2022',
          importe_acumulado: '200000',
          importe_comision: 0,
          importe_comision_acumulado: 0,
          importe_mora_acumulado: 0,
          importe_total_acumulado: '200000',
          importe_minimo_acumulado: 0
        },
        {
          numero_cuota: 1,
          fecha_vencimiento: '10/04/2022',
          importe_acumulado: '200000',
          importe_comision: 0,
          importe_comision_acumulado: 0,
          importe_mora_acumulado: 0,
          importe_total_acumulado: '1000000',
          importe_minimo_acumulado: 0
        }
      ]
    }

    ],
    4000003: [
      {
        operacion: '1-8917323',
        descripcion: 'GODOY VELAZQUEZ, MARIA ZUNILDA',
        cuota: [
          {
            numero_cuota: 1,
            fecha_vencimiento: '2021-10-09',
            importe_acumulado: '758900',
            importe_comision: 0,
            importe_comision_acumulado: 0,
            importe_mora_acumulado: 0,
            importe_total_acumulado: '758900',
            importe_minimo_acumulado: 0
          },
          {
            numero_cuota: 2,
            fecha_vencimiento: '2021-11-09',
            importe_acumulado: '758900',
            importe_comision: 0,
            importe_comision_acumulado: 0,
            importe_mora_acumulado: 0,
            importe_total_acumulado: '758900',
            importe_minimo_acumulado: 0
          },
          {
            numero_cuota: 3,
            fecha_vencimiento: '2021-12-09',
            importe_acumulado: '758900',
            importe_comision: 0,
            importe_comision_acumulado: 0,
            importe_mora_acumulado: 0,
            importe_total_acumulado: '758900',
            importe_minimo_acumulado: 0
          }
        ]
      },
      {
        operacion: '2-8917323',
        descripcion: 'GODOY VELAZQUEZ, MARIA ZUNILDA',
        cuota: [
          {
            numero_cuota: 1,
            fecha_vencimiento: '2022-01-05',
            importe_acumulado: '850000',
            importe_comision: 0,
            importe_comision_acumulado: 0,
            importe_mora_acumulado: 0,
            importe_total_acumulado: '850000',
            importe_minimo_acumulado: 0
          }
        ]
      }
    ]
  };

  try {
    return {
      success: true,
      message: '',
      error: {},
      data: {
        cabecera: {
          transaccion_id,
          nombre: '',
          referencia: body.referencia,
          referencia_nombre: 'RUC',
          moneda_id: 1,
          medio_pago: [
            {
              id: 1,
              nombre: 'Efectivo'
            }
          ],
          solicitar_factura: false
        },
        detalle: cuotas[Number(body.referencia)]
      }
    };
  } catch (error) {
    return {
      success: false,
      message: '',
    };
  }
}

module.exports = {
  formateadorRespuesta
};
