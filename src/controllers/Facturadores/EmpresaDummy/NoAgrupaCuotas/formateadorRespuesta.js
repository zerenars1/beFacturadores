async function formateadorRespuesta(body, transaccion_id) {
  if (Number(body.referencia) < 4000001 || Number(body.referencia) > 4000003) {
    return {
      success: false,
      message: 'El cliente no posee deudas',
    };
  }

  const cuotas = {
    4000001: [
      {
        numero_cuota: 1,
        descripcion: 'Cuota NRO: 1 Producto: NB ACER A514-54-501Z I5-1135G7',
        fecha_vencimiento: '05/01/2022',
        importe_acumulado: 5000000,
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: 5000000,
        importe_minimo_acumulado: 0
      }
    ],

    4000002: [
      {
        numero_cuota: 1,
        descripcion: 'Cuota NRO: 1 Producto: PC INTEL NUC NUC7PJYHN2',
        fecha_vencimiento: '22/01/2022',
        importe_acumulado: 512000,
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: 512000,
        importe_minimo_acumulado: 0
      },
      {
        numero_cuota: 2,
        descripcion: 'Cuota NRO: 2 Producto: PC INTEL NUC NUC7PJYHN2',
        fecha_vencimiento: '22/02/2022',
        importe_acumulado: 512000,
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: 512000,
        importe_minimo_acumulado: 0
      },
      {
        numero_cuota: 3,
        descripcion: 'Cuota NRO: 3 Producto: PC INTEL NUC NUC7PJYHN2',
        fecha_vencimiento: '22/03/2022',
        importe_acumulado: 512000,
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: 512000,
        importe_minimo_acumulado: 0
      }
    ],
    4000003: [
      {
        numero_cuota: 1,
        descripcion: 'Cuota NRO: 1 Producto: TV JAM 65 SMART ISDB-T SK65U20 UHD4K 3840X2160P S.OPERATIVO LINUX',
        fecha_vencimiento: '04/01/2022',
        importe_acumulado: 512000,
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: 512000,
        importe_minimo_acumulado: 0
      },
      {
        numero_cuota: 2,
        descripcion: 'Cuota NRO: 8 Producto: KIT LICUADORA-EXPRIMIDOR-BATIDORA BRITANIA 3 EN 1 BKT31AZT TURQUESA',
        fecha_vencimiento: '04/01/2022',
        importe_acumulado: 121000,
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: 121000,
        importe_minimo_acumulado: 0
      },
      {
        numero_cuota: 3,
        descripcion: 'Cuota NRO: 9 Producto: KIT LICUADORA-EXPRIMIDOR-BATIDORA BRITANIA 3 EN 1 BKT31AZT TURQUESA',
        fecha_vencimiento: '04/02/2022',
        importe_acumulado: 121000,
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: 121000,
        importe_minimo_acumulado: 0
      },
      {
        numero_cuota: 3,
        descripcion: 'Cuota NRO: 10 Producto: KIT LICUADORA-EXPRIMIDOR-BATIDORA BRITANIA 3 EN 1 BKT31AZT TURQUESA',
        fecha_vencimiento: '04/03/2022',
        importe_acumulado: 121000,
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: 121000,
        importe_minimo_acumulado: 0
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
      message: 'Error al obterner deudas',
    };
  }
}

module.exports = {
  formateadorRespuesta
};
