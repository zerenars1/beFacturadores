const bdJson = (referencia) => {
  let respuesta = {
    success: false,
    message: 'Número de celular incorrecto o no existe',
    data: {},
  };

  const data = [
    {
      numero_celular: '0991111000',
      monto: 100000,
      nombre: 'Miranda, Guido',
      vencimiento: '2021-02-28',
    },
    {
      numero_celular: '0991111001',
      monto: 100000,
      nombre: 'Legal, Martin',
      vencimiento: '2021-02-28',
    },
    {
      numero_celular: '0991111002',
      monto: 200000,
      nombre: 'Ortega, Marcos',
      vencimiento: '2021-02-28',
    },
    {
      numero_celular: '0991111003',
      monto: 300000,
      nombre: 'Ozorio, David',
      vencimiento: '2021-02-28',
    },
    {
      numero_celular: '0971111000',
      monto: 100000,
      nombre: 'Pereira, Miguel',
      vencimiento: '2021-02-28',
    },
    {
      numero_celular: '0971111001',
      monto: 100000,
      nombre: 'Morgan, Dexter',
      vencimiento: '2021-02-28',
    },
    {
      numero_celular: '0971111001',
      monto: 200000,
      nombre: 'Dominguez, Rita',
      vencimiento: '2021-02-28',
    },
    {
      numero_celular: '0971111003',
      monto: 300000,
      nombre: 'Morgan, Debra',
      vencimiento: '2021-02-28',
    },
    {
      numero_celular: '0981111000',
      monto: 100000,
      nombre: 'Laguerta, Maria',
      vencimiento: '2021-02-28',
    },
    {
      numero_celular: '0981111001',
      monto: 100000,
      nombre: 'Penayo, Ricardo',
      vencimiento: '2021-02-28',
    },
    {
      numero_celular: '0981111001',
      monto: 200000,
      nombre: 'Machimbre, César',
      vencimiento: '2021-02-28',
    },
    {
      numero_celular: '0981111003',
      monto: 300000,
      nombre: 'Meño, Pana',
      vencimiento: '2021-02-28',
    },
  ];

  const deuda = data.find((e) => e.numero_celular === referencia);

  if (deuda) {
    respuesta = {
      success: true,
      message: 'Éxito',
      data: deuda,
    };
  }

  return respuesta;
};

module.exports = bdJson;
