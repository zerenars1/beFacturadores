const { Op } = require('sequelize');
const moment = require('moment');
const { getSQL } = require('../../../queries');
const { GET_DEUDA_SQL } = require('../../../config/constants');
const { mora_parametro, deuda, medio_pago, sequelize, servicio } = require('../../../models');

const cuotaTieneMora = (fecha_vencimiento) => fecha_vencimiento < new Date();

const getMora = async (servicio_id) => {
  try {
    const result = await mora_parametro.findOne({
      where: {
        servicio_id,
      },
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getMediosDePago = async (servicio_id) => {
  try {
    const result = await medio_pago.findAll({
      attributes: ['id', 'nombre'],
      where: {
        id: {
          [Op.in]: [
            sequelize.literal(`(select medio_pago_id 
                                  from facturador.servicio_medio_pago smp
                                  where smp.servicio_id = ${servicio_id})`),
          ],
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getServicioDescripcion = async (servicio_id) => {
  try {
    const result = await servicio.findOne({
      where: {
        id: servicio_id,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const actualizarDeuda = async (dias_atraso, importe_mora, id) => {
  try {
    return await deuda.update(
      {
        dias_atraso,
        importe_mora,
      },
      {
        where: { id },
        returning: true,
        plain: true,
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

const calucluarDiasDeAtraso = (fecha_vencimiento) => {
  const diasDeAtraso = moment(new Date(), 'YYYY-MM-DD').diff(
    moment(fecha_vencimiento, 'YYYY-MM-DD'),
    'days'
  );
  return Number(diasDeAtraso);
};

const obtenerMora = (importe, mora, dias_de_atraso) => {
  let importeMora;
  const tipo_mora = mora.porcentaje ? 'Porcentaje' : 'Monto_fijo';
  const valor_mora = mora.porcentaje ? mora.porcentaje : mora.monto_fijo;

  switch (tipo_mora) {
    case 'Porcentaje':
      importeMora = ((importe * valor_mora) / 100) * (mora.mora_dia ? dias_de_atraso : 1);
      return importeMora;
    case 'Monto Fijo':
      importeMora = valor_mora * (mora.mora_dia ? dias_de_atraso : 1);
      return importeMora;
    default:
      return 'No se encontró ninguna configuración';
  }
};

const calcularMoraSiExiste = async (deuda_id, fecha_vencimiento, mora_config, deuda_importe) => {
  let diasDeAtraso = 0;
  let importeMora = 0;

  if (cuotaTieneMora(fecha_vencimiento)) {
    diasDeAtraso = calucluarDiasDeAtraso(fecha_vencimiento, deuda_id);
    importeMora = obtenerMora(deuda_importe, mora_config, diasDeAtraso);
  }

  await actualizarDeuda(diasDeAtraso, importeMora, deuda_id);
};

const getDeudas = async (referencia, servicio_id) => {
  try {
    const PROXIMAS_A_VENCER = 3;

    // #region Obtener todas las deudas para actualizar la mora
    const mora = await getMora(servicio_id);

    const allDeuda = await deuda.findAll({
      where: {
        referencia,
        servicio_id,
        pago_id: {
          [Op.eq]: null,
        },
      },
    });

    allDeuda.forEach(async (d) => {
      await calcularMoraSiExiste(d.id, d.fecha_vencimiento, mora, d.importe);
    });
    // #endregion

    // Obtiene las últimas tres deudas próximas a vencer por operación
    const result = await getSQL({ referencia, PROXIMAS_A_VENCER, servicio_id }, GET_DEUDA_SQL);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getDeudas,
  getMora,
  getMediosDePago,
  getServicioDescripcion,
};
