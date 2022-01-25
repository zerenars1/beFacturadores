const bunyan = require('bunyan');
const bm = require('bunyan-morgan');
const morgan = require('morgan');
const LogStream = require('./dbStream');

const options = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'test',
  },
  tableName: 'logs',
};

const logger = bunyan.createLogger({
  name: 'sql stream',
  level: 'info',
  serializers: {
    morgan: bm.morgan('combined'),
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
});

logger.addStream({
  level: 'info',
  closeOnExit: true,
  stream: LogStream(options),
  // type: 'raw',
});

const tapResponse = function (req, res, next) {
  req.responseBody = new Promise((resolve) => {
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];
    res.write = function (chunk, ...rest) {
      chunks.push(Buffer.from(chunk));
      return oldWrite.apply(res, [chunk, ...rest]);
    };

    res.end = function (chunk, ...rest) {
      if (chunk) chunks.push(Buffer.from(chunk));

      const body = Buffer.concat(chunks);
      try {
        resolve(JSON.parse(body.toString('utf8')));
      } catch {
        resolve(body.toString('base64'));
      }
      oldEnd.apply(res, [chunk, ...rest]);
    };
  });
  next();
};

function middleware(tokens, req, res) {
  const { method, url, status } = tokens;

  const userId = typeof req.datos !== 'undefined' ? `[user:${req.datos.id}]` : 'NoToken';

  const ip = tokens['remote-addr'](req, res);
  const verb = method(req, res);
  const path = url(req, res);
  const responseCode = status(req, res);
  const time = tokens['response-time'](req, res);
  const message = ` ${userId} IP: ${ip} Method: ${verb} URL: ${path} Status: ${responseCode} - ${time} ms`;

  req.responseBody
    .then((response) => {
      const test = {
        ip,
        user: req.datos,
        request: {
          verb,
          headers: req.headers,
          body: req.body,
          params: req.params,
          query: req.query,
          path,
        },
        response: {
          data: response,
          responseCode,
          time,
        },
        message,
      };

      logger.info(test);
    })
    .catch(console.log);
}

const logHandler = morgan(middleware);

module.exports = { logHandler, tapResponse };
