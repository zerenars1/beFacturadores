async function pago(params) {
  try {
    const ticket = `REFERENCIA: ${params.body.referencia}`;

    const result = {
      success: true,
      message: 'Éxito',
      data: {
        ticket,
        referencia: params.body.referencia,
      },
    };

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { pago };
