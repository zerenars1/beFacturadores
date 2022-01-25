const result = {
  data: {
    items: [
      {
        valor: '4194261',
        tipo: 'StringField',
        editable: false,
        titulo: 'Número de Documento',
        visible: true,
        required: false,
        ayuda: null,
        mostrarEnPasos: null,
        resumen: true,
        pattern: null,
        multiple: false,
        html: null,
        orden: 1,
        grupoCampos: []
      },
      {
        valor: 'MARIA SUSANA CORONEL CHAVEZHAVEZ',
        tipo: 'StringField',
        editable: false,
        titulo: 'Cliente',
        visible: true,
        required: false,
        ayuda: null,
        mostrarEnPasos: null,
        resumen: true,
        pattern: null,
        multiple: false,
        html: null,
        orden: 2,
        grupoCampos: []
      },
      {
        nombre: 'monto',
        valor: null,
        tipo: 'MoneyField',
        editable: true,
        titulo: 'Monto a Pagar',
        visible: true,
        required: true,
        ayuda: null,
        mostrarEnPasos: null,
        resumen: false,
        pattern: null,
        multiple: false,
        html: null,
        orden: 3,
        grupoCampos: []
      },
      {
        nombre: 'tabla',
        valor: null,
        tipo: 'RadioTableField',
        editable: true,
        titulo: 'Cuotas',
        visible: true,
        required: true,
        ayuda: null,
        mostrarEnPasos: null,
        resumen: true,
        pattern: null,
        multiple: false,
        html: null,
        orden: 4,
        grupoCampos: [
          {
            valor: null,
            tipo: 'HeaderField',
            editable: false,
            titulo: '',
            visible: true,
            required: false,
            ayuda: null,
            mostrarEnPasos: null,
            resumen: false,
            pattern: null,
            multiple: false,
            html: null,
            orden: 1,
            grupoCampos: [
              {
                valor: null,
                tipo: 'StringField',
                editable: false,
                titulo: 'Cuota Nro.',
                visible: true,
                required: false,
                ayuda: null,
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 2,
                grupoCampos: []
              },
              {
                valor: null,
                tipo: 'StringField',
                editable: false,
                titulo: 'Nro Factura',
                visible: true,
                required: false,
                ayuda: null,
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 3,
                grupoCampos: []
              },
              {
                valor: null,
                tipo: 'StringField',
                editable: false,
                titulo: 'Fecha de Vencimiento',
                visible: true,
                required: false,
                ayuda: null,
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 4,
                grupoCampos: []
              },
              {
                valor: null,
                tipo: 'StringField',
                editable: false,
                titulo: 'Deuta Total',
                visible: true,
                required: false,
                ayuda: null,
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 5,
                grupoCampos: []
              },
              {
                valor: null,
                tipo: 'StringField',
                editable: false,
                titulo: 'Saldo',
                visible: true,
                required: false,
                ayuda: null,
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 6,
                grupoCampos: []
              },
              {
                nombre: 'info',
                valor: null,
                tipo: 'HiddenField',
                editable: false,
                titulo: '',
                visible: true,
                required: true,
                ayuda: null,
                mostrarEnPasos: null,
                resumen: false,
                pattern: null,
                multiple: false,
                html: null,
                orden: 7,
                grupoCampos: []
              }
            ]
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
                valor: '18',
                tipo: 'StringField',
                editable: false,
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
                grupoCampos: []
              },
              {
                valor: '00001102457289',
                tipo: 'StringField',
                editable: false,
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
                grupoCampos: []
              },
              {
                valor: '05/01/2022',
                tipo: 'StringField',
                editable: false,
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
                grupoCampos: []
              },
              {
                valor: '375000.00',
                tipo: 'MoneyField',
                editable: false,
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
                grupoCampos: []
              },
              {
                valor: '375000.00',
                tipo: 'MoneyField',
                editable: false,
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
                grupoCampos: []
              },
              {
                nombre: 'tabla:1:info',
                valor: '12843824:375000.00:0:4194261:9:MARIA SUSANA CORONEL CHAVEZHAVEZ:41942610000110245728918:00001102457289:18:05/01/2022',
                tipo: 'HiddenField',
                editable: false,
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
                grupoCampos: []
              }
            ]
          }
        ]
      }
    ],
    info: {
      duplicateControl: 3583546,
      documentoPais: null,
      documentoTipo: null,
      documentoNumero: '4194261',
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
      nombre: 'MARIA SUSANA CORONEL CHAVEZHAVEZ',
      sing: 'ee9b57e31d9b9e9530aa4adf4e8958350484c6aea799e65639ba60506f8577a5'
    }
  }
};

module.exports = result;