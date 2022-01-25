const result = {
  data: {
    items: [
      {
        nombre: 'fi0_1',
        valor: '1',
        tipo: 'NumberField',
        editable: false,
        titulo: 'Tipo de documento',
        visible: true,
        required: true,
        ayuda: '',
        mostrarEnPasos: null,
        resumen: false,
        pattern: '^[1-2]$',
        multiple: false,
        html: null,
        orden: 0,
        grupoCampos: [],
        minLength: 1,
        maxLength: 1,
      },
      {
        nombre: 'fi0_2',
        valor: '3408514',
        tipo: 'StringField',
        editable: false,
        titulo: 'CI/Nro de Socio',
        visible: true,
        required: true,
        ayuda: '',
        mostrarEnPasos: null,
        resumen: false,
        pattern: null,
        multiple: false,
        html: null,
        orden: 0,
        grupoCampos: [],
        minLength: 1,
        maxLength: 15,
      },
      {
        valor: null,
        tipo: 'RadioTableField',
        editable: null,
        titulo: null,
        visible: true,
        required: true,
        ayuda: null,
        mostrarEnPasos: null,
        resumen: false,
        pattern: null,
        multiple: false,
        html: null,
        orden: 0,
        grupoCampos: [
          {
            valor: null,
            tipo: 'HeaderField',
            editable: null,
            titulo: null,
            visible: true,
            required: false,
            ayuda: null,
            mostrarEnPasos: null,
            resumen: false,
            pattern: null,
            multiple: false,
            html: null,
            orden: 0,
            grupoCampos: [
              {
                nombre: 'key',
                valor: null,
                tipo: 'HiddenField',
                editable: null,
                titulo: null,
                visible: true,
                required: false,
                ayuda: null,
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 0,
                grupoCampos: [],
              },
              {
                valor: null,
                tipo: 'StringField',
                editable: false,
                titulo: 'Vencimiento',
                visible: true,
                required: false,
                ayuda: null,
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 0,
                grupoCampos: [],
              },
              {
                valor: null,
                tipo: 'StringField',
                editable: false,
                titulo: 'Deuda',
                visible: true,
                required: false,
                ayuda: null,
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 0,
                grupoCampos: [],
              },
              {
                valor: null,
                tipo: 'StringField',
                editable: false,
                titulo: 'Descripción',
                visible: true,
                required: false,
                ayuda: null,
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 0,
                grupoCampos: [],
              },
            ],
          },
          {
            valor: null,
            tipo: 'RowField',
            editable: null,
            titulo: null,
            visible: true,
            required: false,
            ayuda: null,
            mostrarEnPasos: null,
            resumen: false,
            pattern: null,
            multiple: false,
            html: null,
            orden: 0,
            grupoCampos: [
              {
                nombre: 'tabla:1:key',
                valor:
                  '{"key":"78095.;::;.001","customerData":"1.;::;.3408514","aditionalData":"DILIAN KARINA MARTINEZ CACERES.;::;.1.;::;.0.;::;.11376.;::;.0.;::;.0.;::;.10000","vencimiento":"Jan 31, 2022 12:00:00 AM"}',
                tipo: 'HiddenField',
                editable: null,
                titulo: '',
                visible: true,
                required: false,
                ayuda: '',
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 0,
                grupoCampos: [],
              },
              {
                valor: '31/01/2022',
                tipo: 'DateField',
                editable: null,
                titulo: '',
                visible: true,
                required: false,
                ayuda: '',
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 0,
                grupoCampos: [],
              },
              {
                nombre: 'tabla:1:monto',
                valor: '10000',
                tipo: 'MoneyField',
                editable: null,
                titulo: '',
                visible: true,
                required: false,
                ayuda: '',
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 0,
                grupoCampos: [],
              },
              {
                nombre: 'tabla:1:descripcion',
                valor: 'SOLIDARIDAD-CUOTA:001',
                tipo: 'TextareaField',
                editable: null,
                titulo: '',
                visible: true,
                required: false,
                ayuda: '',
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 0,
                grupoCampos: [],
              },
            ],
          },
        ],
      },
    ],
    info: {
      duplicateControl: 3615224,
      documentoPais: null,
      documentoTipo: null,
      documentoNumero: '3408514',
      facturaNro: null,
      facturaTipo: null,
      cuotaNro: 0,
      factDeudaId: null,
      validBantotalId: null,
      refDeuda: null,
      fechaEmision: null,
      fechaVencimiento: null,
      fechaProceso: null,
      deuda: 0,
      cargo: 0,
      monto: 0,
      moneda: 6900,
      nombre: null,
      sing: '84d90e7fb66e5fdf483f3b0b86ead9927c04ef84845482897c11ac95e7191107',
    },
  },
};

module.exports = result;