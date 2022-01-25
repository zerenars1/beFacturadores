const axios = require('axios');
const obtenerToken = require('../../Fielco/obtenerToken');
const {formateadorRespuesta} = require('../Tarjetas/formateadorRespuesta')
const { consultaServices } = require('../../../../services/index');
const { buildTicketBody } = require('../../../Operaciones/ticketCustom.controllers');

const getDatosTarjeta =  async (tarjetas_cliente,tarjeta_a_pagar) => {
    const tarjeta = tarjetas_cliente[tarjeta_a_pagar - 1]
    const datos_tarjeta = {
        afinidad: tarjeta.afinidad,
        clase: tarjeta.clase,
        descripcion: tarjeta.descripcion,
        deudaTotal: tarjeta.deudaTotal,
        fechaUltVencimiento: tarjeta.fechaUltVencimiento,
        marca: tarjeta.marca,
        modulo: tarjeta.modulo,
        moneda: tarjeta.moneda,
        monedaLetras: tarjeta.monedaLetras,
        numeroTarjeta: tarjeta.numeroTarjeta,
        numeroTarjetaLargo: tarjeta.numeroTarjetaLargo,
        operacion: tarjeta.operacion,
        pagoMinimo: tarjeta.pagoMinimo,
        papel: tarjeta.papel,
        subCuenta: tarjeta.subCuenta,
        sucursal: tarjeta.sucursal,
        tipoOperacion: tarjeta.tipoOperacion
    }
    return datos_tarjeta;
}
    

const consulta = async (params) => {
    try {
        const resp = await obtenerToken(params);

        const documento = {
            codigoPais: 600,
            codigoTipoDoc: 2,
            numeroDocumento: params.body.referencia
        }

        const result = await axios({
            url: params.facturador.protocolo.concat(params.facturador.host),
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept':'application/json',
                'X-RshkMichi-ApiKey': params.facturador.api_key,
                'X-RshkMichi-AccessToken':resp.data.accessToken
              },
            data: documento,
            timeout: params.facturador.time_out,
          })


        if (typeof result.data.code !== 'undefined' && result.data.code === 'g1000') {
            throw new Error('Error interno del facturador.')
        }

        if (result.data.tarjetas.length < 1) {
            return {
                success:false,
                message: 'El cliente tarjetas con deudas.',
                data:{}
            }
        }
        return formateadorRespuesta(result, params.body, params.transaccion_id)
        

        
    } catch (error) {
        return {
            success:false,
            error,
            message: error.message,
            data:{}
        }      
    }
}

const pago = async (params) => {
    try {
        const transaccionPadre = await consultaServices.getTransaccionPadre(
            params.transaccion_padre_id
          );

        const tarjetas_cliente = transaccionPadre.respuesta_facturador.r_fielco.tarjetas;
        const tarjeta_a_pagar = params.body.numero_cuota;
        const datos_tarjeta = await getDatosTarjeta(tarjetas_cliente, tarjeta_a_pagar)
        const tipoDocumento = transaccionPadre.respuesta_facturador.r_fielco.codigoTipoDoc;
        const numeroCuenta = transaccionPadre.respuesta_facturador.r_fielco.numeroCuenta
        const { data: {accessToken, usuario} } = await obtenerToken(params);

        const parametros = {
            agenciaId: usuario.idAgencia,
            codigoSucursalDependiente: usuario.sucursalDependiente ,
            monedaId:datos_tarjeta.moneda ,
            montoAPagar: params.body.importe_acumulado ,
            numeroCuenta,
            numeroDocumento: params.body.referencia,
            paisDocumento: 600,
            sucursalId: usuario.idSucursal ,
            tarjetaCredito: datos_tarjeta,
            tipoDocumento,
            tipoDocumentoDescripcion:"CI",
            usuario: usuario.nombreUsuario,
            usuarioId: usuario.id
        }

        const result = await axios({
            url: params.facturador.protocolo.concat(params.facturador.host),
            method: params.facturador.metodo,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept':'application/json',
                'X-RshkMichi-ApiKey': params.facturador.api_key,
                'X-RshkMichi-AccessToken': accessToken
              },
            data: parametros,
            validateStatus: (status) => {
                return true; 
              },
            timeout: params.facturador.time_out,
          });
          
          if (typeof result.data.code !== 'undefined' && result.data.code === 'g1000') {
            throw new Error('Error interno del facturador.')
          }

          if (result.data.estado === "OK") {
            const obj = {
                transaccionPadreId: params.transaccion_padre_id,
                fechaVencimiento: params.body.fecha_vencimiento,
                referenciaString: 'C.I',
                referencia: params.body.referencia,
            };
            const ticket = await buildTicketBody(obj);
            return {
                success:true,
                message:"Éxito",
                data: {
                    ticket,
                    referencia: params.body.referencia
                }
            }
        }
       
        throw new Error ("No se pudo realizar la operacion")
        
    } catch (error) {
        return {
            success:false,
            error,
            message: error.message,
            data:{}
        }      
    }
}

const reversa = async (params) => {
    try {
        const trxPago = await consultaServices.getTransaccionPadre(params.transaccion_padre_id);
        const trxConsulta = await consultaServices.getTransaccionPadre(trxPago.transaccion_padre_id);
        const respuestaFacturador = trxConsulta.respuesta_facturador.r_fielco;
        const tarjetas_cliente = respuestaFacturador.tarjetas;
        const tarjeta_a_pagar = params.body.numero_cuota;
        const datos_tarjeta = await getDatosTarjeta(tarjetas_cliente, tarjeta_a_pagar);
        const tipoDocumento = respuestaFacturador.codigoTipoDoc;
        const numeroCuenta = respuestaFacturador.numeroCuenta
        const { data: {accessToken, usuario} } = await obtenerToken(params);

        const parametros = {
            agenciaId: usuario.idAgencia,
            codigoSucursalDependiente: usuario.sucursalDependiente ,
            monedaId:datos_tarjeta.moneda ,
            montoAPagar: trxPago.monto,
            numeroCuenta,
            numeroDocumento: params.body.referencia,
            paisDocumento: 600,
            sucursalId: usuario.idSucursal ,
            tarjetaCredito: datos_tarjeta,
            tipoDocumento,
            tipoDocumentoDescripcion:"CI",
            usuario: usuario.nombreUsuario,
            usuarioId: usuario.id
        }

        const result = await axios({
            url: params.facturador.protocolo.concat(params.facturador.host),
            method: params.facturador.metodo,
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Accept': 'application/json',
              'X-RshkMichi-ApiKey': params.facturador.api_key,
              'X-RshkMichi-AccessToken': accessToken
            },
            validateStatus: (status) => {
                    return true; 
            },
            data: parametros,
            timeout: params.facturador.time_out,
          });
         
        if (result.data?.estado === 'OK') {
            return {
              success: true,
              message: result.data.mensaje,
              data: result.data,
            };
          }
          if (result.data?.estado === 'ERROR') {
            return {
              success: false,
              message: 'El facturador no aprobo la reversa',
              data: result.data,
            };
          }

          if (result.data?.code) {
            return {
              success: false,
              message: result.data.message,
              data: result.data,
            };
          }
          return {
            success: false,
            message: 'Error al realizar la reversa'
          };
        
    } catch (error) {

        return {
            success: false,
            message: e.message
          };
    }
  

}
module.exports = {
    consulta,
    pago,
    reversa
}