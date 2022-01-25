const envVarExist = (name) => {
  if (!process.env[name]) {
    throw new Error(`Falta definir la variable de entorno ${name}`);
  }
};

const envVarIsInt = (name) => {
  if (!Number.isInteger(parseInt(process.env[name], 10))) {
    throw new Error(`Parametro ${name} debe ser un entero`);
  }
};

module.exports = { envVarExist, envVarIsInt };
