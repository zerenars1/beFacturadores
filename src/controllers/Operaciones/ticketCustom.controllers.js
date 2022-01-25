const { transaccion } = require('../../models');

module.exports = {
  async buildTicketBody(params) {
    const trxPadre = await transaccion.findOne({
      where: {
        id: params.transaccionPadreId,
      },
      raw: true,
    });
    
    const cliente =  trxPadre && trxPadre.respuesta_facturador.cabecera.nombre ? `CLIENTE: ${trxPadre.respuesta_facturador.cabecera.nombre}\\n` : '';
    const fechaVen = params.fechaVencimiento
      ? `FECHA_VENCIMIENTO: ${params.fechaVencimiento}\\n`
      : '';
    const avisos = params.avisos
      ? `AVISOS: ${trxPadre.respuesta_facturador.cabecera.aviso_princ}. ${trxPadre.respuesta_facturador.detalle[0].aviso_sec}\\n`
      : '';
    const texto = params.texto ? params.texto : '';
    const referencia = `${params.referenciaString}: ${params.referencia}`;
    const body = `${cliente}${fechaVen}${avisos}${referencia}${texto}`;

    return body;
  },
};
