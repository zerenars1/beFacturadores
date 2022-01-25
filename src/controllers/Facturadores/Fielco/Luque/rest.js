
const pagoTarjeta = require('./tarjetas/pagoTarjetas');
const pagoPrestamos = require('./prestamos/pagoPrestamo');
const pagoSolidaridad = require('./Solidaridad/pagoSolidaridad');
async function consulta(params) {
    switch (params.facturador.codServicio) {
        case '1237':
            return pagoTarjeta.consulta(params);
        case '2205':
            return pagoPrestamos.consulta(params);
            case '2204':
                return pagoSolidaridad.consulta(params);
        default:
            return {
                success: false,
                message: 'No se especifico el codigo de servicio del facturador',
                data: {}
            };
    }
}

async function pago(params) {
    switch (params.facturador.codServicio) {
        case '1237':
            return pagoTarjeta.pago(params);
        case '2205':
            return pagoPrestamos.pago(params);
            case '2204':
                return pagoSolidaridad.consulta(params);
        default:
            return {
                success: false,
                message: 'No se especifico el codigo de servicio del facturador',
                data: {}
            };
    }
}

module.exports = {
    pago,
    consulta
};
