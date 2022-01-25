/* eslint-disable indent */
const { sequelize } = require('../../../models');

const getTxnIdByTransaccion = async (transsacionId) => {
    try {
        const sql = `SELECT transaccion_facturador as txn_id FROM facturador.transaccion WHERE transaccion_id = ${transsacionId}`;
        const result = await sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT,
            plain: true
        });
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getTxnIdByTransaccion };
