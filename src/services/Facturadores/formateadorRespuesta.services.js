let cantidadDeOperaciones = 0;
let operacionesKey = [];

function insertDecimal(num) {
  const decimalValue = Number(num / 100);
  /* Los dos últimos dígitos retornados por CrediCentro
      corresponden a la parte decimal; si son ceros, no enviar al front. */
  return parseFloat(
    decimalValue.toFixed(2).split('.')[1] === '00' ? decimalValue : decimalValue.toFixed(2)
  );
}

const distinct = (value, index, self) => {
  const distinctResult = self.indexOf(value) === index;
  return distinctResult;
};

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
      cantidadDeOperaciones++;
      operacionesKey.push(key[0]);
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

function findVal(object, key) {
  let value;
  Object.keys(object).some((k) => {
    if (k === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === 'object') {
      value = findVal(object[k], key);
      return value !== undefined;
    }
    return false;
  });
  return value;
}

const operacionesAgrupadas = () => {
  const object = {
    cantidadDeOperaciones,
    operacionesKey,
  };
  return object;
};

const reiniciarValoresAuxiliares = () => {
  cantidadDeOperaciones = 0;
  operacionesKey = [];
};

function groupByNested(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property].$t;
    if (!acc[key]) {
      acc[key] = [];
      cantidadDeOperaciones++;
      operacionesKey.push(key[0]);
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

module.exports = {
  distinct,
  groupBy,
  findVal,
  operacionesAgrupadas,
  insertDecimal,
  reiniciarValoresAuxiliares,
  groupByNested
};
