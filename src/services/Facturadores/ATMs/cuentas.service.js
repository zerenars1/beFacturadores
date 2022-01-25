const { sequelize } = require('../../../models');

const getCuentasAtms = async () => {
  try {
    const sql = `select c.id as cuenta_id, numero as nro_cuenta, activo, denominacion, nombre as banco
        from procesadora.cuenta c join public.banco b on (b.id = c.banco_id)
        where cuenta_tipo_id = (select id from public.cuenta_tipo ct 
                    where ct.nombre like 'CUENTA TRANSITORIA DEPOSITO SERVICIO ATM');`;
    const result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getCuentasAtms };
