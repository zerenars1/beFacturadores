/* eslint-disable indent */
const axios = require('axios');
const crypto = require('crypto');
const moment = require('moment');

const sha1 = (data) => crypto.createHash('sha1').update(data, 'binary').digest('hex');

const buildPass = () => {
    try {
        const now = moment(new Date()).format();
        const passCryp = sha1(`${now}##wepa##MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKwVhB1hCJ/MTNafZmXYvuOLHa/yYWoH6xSlknlsReQdjQvxHiWs8rhPPzCIqD5qwVu4UKnTgEAG4wbFZ23ivTcCAwEAAQ==`);

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
        const { protocolo, host_token, api_key, time_out } = params.facturador;

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
            url: protocolo.concat(host_token).concat(getQueryParams(parameters)),
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-RshkMichi-ApiKey': api_key,
            },
            timeout: time_out,
        });

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = login;
