const axios = require('axios');
const moment = require('moment');
const crypto = require('crypto');

const obtenerToken = async (params) => {
  try {
    const {
      protocolo,
      metodo,
      host_token,
      api_key,
      time_out,
      usuario,
      password
    } = params.facturador;

    const device_id = 'wepa';
    const auth_type = 'cnb';
    const auth_version = '1.0.0';
    const client_type = 'WEPA';
    const client_version = '1.0.0';
    const tstamp = moment(new Date()).format();
    const sharedsecret = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKwVhB1hCJ/MTNafZmXYvuOLHa/yYWoH6xSlknlsReQdjQvxHiWs8rhPPzCIqD5qwVu4UKnTgEAG4wbFZ23ivTcCAwEAAQ==';
    let ssing = '';

    // crear ssign
    const hash = crypto.createHash('sha1');
    const data = hash.update(`${tstamp}##${usuario}##${sharedsecret}`, 'utf-8');
    const gen_hash = data.digest();
    ssing = Buffer.from(gen_hash).toString('base64');

    const queryParams = `?device_id=${device_id}&auth_type=${auth_type}&auth_version=${auth_version}&client_type=${client_type}&client_version=${client_version}&tstamp=${tstamp}&user=${usuario}&password=${password}&ssign=${encodeURIComponent(ssing)}`;
    const result = await axios({
      url: protocolo.concat(host_token).concat(queryParams),
      method: metodo,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-RshkMichi-ApiKey': api_key,
      },
      timeout: time_out,
    });

    return result;
  } catch (error) {
    if (error.isAxiosError) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('No se pudo conectar con el facturador');
      }

      if (typeof error.response !== 'undefined') {
        if (error.response.status === 400) {
          throw new Error('El facturador rechazo la peticion de login');
        }
      }
    }

    throw new Error(error.message);
  }
};

module.exports = obtenerToken;
