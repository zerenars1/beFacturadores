if (process.env.ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  db: require('./db'),
  params: require('./params'),
  ROUTES: require('./routes'),
};
