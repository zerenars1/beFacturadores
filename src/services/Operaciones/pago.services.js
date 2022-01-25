const {facturador_parametro, empresa_sucursal} = require('../../models');


const getParametroFacturador = async (facturador_id) => {
    try {
      const result = await facturador_parametro.findOne({
        where: {
          facturador_id,
        },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

const getComercioSucursal = async (comercio_sucursal_id) => {
    try {
        const result = await empresa_sucursal.findOne({
          where: {
            id:comercio_sucursal_id,
          },
        });
        return result;
      } catch (error) {
        throw new Error(error);
      }
}
  




module.exports = {
    getParametroFacturador,
    getComercioSucursal
  };
  