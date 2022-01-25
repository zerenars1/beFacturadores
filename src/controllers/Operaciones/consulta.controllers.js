const operaciones = require('./index');
const { consultaServices } = require('../../services/index');

const construirOperacion = async (req, res, next) => {
  try {
    const { servicio_id, transaccion_tipo_id } = req.body.data;
    const { transaccion_id, transaccion_padre_id } = req.body;
    // #region Obtener datos de la base de datos
    const facturador = await consultaServices.getFacturador(servicio_id);

    const servicioOperacion = await consultaServices.getServicioOperacion(
      servicio_id,
      transaccion_tipo_id
    );
    // #endregion

    // #region Armar datos a enviar a la función del facturador
    const {
      usuario,
      password,
      time_out,
      metodo,
      host,
      protocolo,
      nombre_funcion,
      cod_servicio_facturador,
      tipo_transaccion_facturador,
      api_key,
      host_validacion,
      host_token,
    } = servicioOperacion;

    const parametros = {
      facturador: {
        archivoFacturador: facturador.nombre,
        redPago: facturador.codigo_red,
        usuario,
        password,
        time_out,
        metodo,
        host,
        protocolo,
        nombre_funcion,
        codServicio: cod_servicio_facturador,
        tipoTransaccion: tipo_transaccion_facturador,
        api_key,
        host_validacion,
        host_token,
      },
      body: req.body.data,
      transaccion_id: transaccion_id || null,
      transaccion_padre_id: transaccion_padre_id || null,
    };
    // #endregion

    const response = await operaciones.ejecutarOperacion(parametros);

    return res.status(200).json({
      success: response.success,
      message: response.message || '',
      error: response.error || {},
      data: response.data || {},
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = { construirOperacion };
