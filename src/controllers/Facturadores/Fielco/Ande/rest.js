const axios = require('axios');
const crypto = require('crypto');
const moment = require('moment');
const { formateadorRespuesta } = require('./formateadorRespuesta');

const sha1 = (data) => crypto.createHash('sha1').update(data, 'binary').digest('hex');

const buildPass = () => {
  try {
    const now = moment(new Date()).format();
    const passCryp = sha1(`${now}##wepa##MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKwVhB1hCJ/MTNafZmXYvuOLHa/yYWoH6xSlknlsReQ
    djQvxHiWs8rhPPzCIqD5qwVu4UKnTgEAG4wbFZ23ivTcCAwEAAQ==`);

    return {
      now,
      passCryp,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getQueryParams = (parameters) => {
  const {
    device_id,
    auth_type,
    auth_version,
    client_type,
    client_version,
    tstamp,
    user,
    password,
    ssign,
  } = parameters;

  const queryParams = `?device_id=${device_id}&auth_type=${auth_type}&auth_version=${auth_version}&client_type=${client_type}&client_version=${client_version}&tstamp=2020-02-11T07:01:22-03:00&user=${user}&password=7c4a8d09ca3762af61e59520943dc26494f8941b&ssign=HK%2FbVBhSi5bIGR%2BcEkWL466TXDs%3D`;
  return queryParams;
};

const login = async (params) => {
  try {
    const { now, passCryp } = buildPass();
    const passHash = Buffer.from(passCryp).toString('base64');

    const parameters = {
      device_id: 'wepa',
      auth_type: 'cnb',
      auth_version: '1.0.0',
      client_type: 'WEPA',
      client_version: '1.0.0',
      tstamp: now,
      user: 'wepa',
      password: passCryp,
      ssign: passHash,
    };

    const result = await axios({
      url: `http://192.168.30.64:8304/auth-fielcorresponsal/access-token/request${getQueryParams(
        parameters
      )}`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-RshkMichi-ApiKey':
          '369980270e4e6fe92662@e3720fe2-b3fc-43f8-a653-b308b7c54dc9@22499e9b2fc47ecd303c',
      },

      timeout: params.facturador.time_out,
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const buscar = async (params) => {
  try {
    const token = await login(params);
    const result = await axios({
      url: 'http://192.168.30.64:8305/api/pago-servicios-fielcorresponsal/buscar',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-RshkMichi-ApiKey':
          '369980270e4e6fe92662@e3720fe2-b3fc-43f8-a653-b308b7c54dc9@22499e9b2fc47ecd303c',
        'X-RshkMichi-AccessToken': token.data.accessToken,
        'PS-operacion-code': 706,
      },
      data: {
        items: {
          nis: params.body.referencia,
        },
      },
      timeout: params.facturador.time_out,
    });

    const data = { items: {}, info: {}, token: { accessToken: token.data.accessToken } };

    result.data.items.forEach((items) => {
      if (items.required) data.items[items.nombre] = items.valor;
    });

    data.info = result.data.info;

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const consulta = async (params) => {
  try {
    const busqueda = await buscar(params);
    const result = await axios({
      url: 'http://192.168.30.64:8305/api/pago-servicios-fielcorresponsal/pagar/info',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-RshkMichi-ApiKey':
          '369980270e4e6fe92662@e3720fe2-b3fc-43f8-a653-b308b7c54dc9@22499e9b2fc47ecd303c',
        'X-RshkMichi-AccessToken': busqueda.token.accessToken,
        'PS-operacion-code': 706,
      },
      data: {
        items: busqueda.items,
        info: busqueda.info,
      },
      timeout: params.facturador.time_out,
    });

    return formateadorRespuesta(result.data, params.body, params.transaccion_id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { consulta };
