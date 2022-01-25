const http = require('http');
const app = require('./app');
const { params } = require('./src/config');

console.time('Arrancamos el server en');
const server = http.createServer(app).listen(params.port, params.host, () => {
  const { port } = server.address();
  const host = server.address().address;
  console.log(`Facturadores Core - API en http://${host}:${port}`);
  console.timeEnd('Arrancamos el server en');
});

// Si hay una promesa sin un catch
process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled Rejection at: ${p} reason: ${reason}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});
// Si ocurre alguna exception que no este debidamente tratada.
process.on('uncaughtException', (err) => {
  console.error(`Caught exception: ${err}\n`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});
