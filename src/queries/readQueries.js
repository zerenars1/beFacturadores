const path = require('path');
const fs = require('fs');

module.exports = (dir) => {
  // eslint-disable-next-line no-sync
  const queries = fs
    .readdirSync(path.resolve(dir))
    .filter((file) => file.endsWith('.sql'))
    .map((file) => ({
      name: file,
      // eslint-disable-next-line no-sync
      content: fs.readFileSync(path.resolve(dir, file), 'utf8').replace(/\r\n/g, '\n'),
    }))
    .map((value) =>
      value.content.split('\n\n').map((sql) => {
        if (sql.startsWith('-- ')) {
          const name = sql.split('\n')[0].substring(2).trim();
          return {
            [name]: sql,
          };
        }
      })
    )
    .reduce((acc, value) => acc.concat(value), []);
  // eslint-disable-next-line prefer-spread
  const result = Object.assign.apply(Object, queries);
  return result;
};
