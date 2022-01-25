const crypto = require('crypto');

const getChekHash = (command, account, currency, sid, secretKey) => {
  const str = command + account + currency + sid + secretKey;
  const hash = crypto.createHash('md5').update(str).digest('hex');
  return hash;
};

const getPayHash = (command, txn_id, account, amount, currency, sid, secretKey) => {
  const str = command + txn_id + account + amount + currency + sid + secretKey;
  const hash = crypto.createHash('md5').update(str).digest('hex');
  return hash;
};

const getCancelHash = (command, txn_id, sid, secretKey) => {
  const str = command + txn_id + sid + secretKey;
  const hash = crypto.createHash('md5').update(str).digest('hex');
  return hash;
};

module.exports = { getChekHash, getPayHash, getCancelHash };
