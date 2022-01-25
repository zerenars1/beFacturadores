const axios = require('axios');
const obtenerToken = require('../../Fielco/obtenerToken');
const {formateadorRespuesta} = require('./formateadorRespuesta')
const { consultaServices } = require('../../../../services/index');
const { buildTicketBody } = require('../../../Operaciones/ticketCustom.controllers');

const getCantidadCuotas = async (prestamos, importe, operacion) => {
    try {
        const pre = prestamos.respuesta_facturador.prestamos.find( p => p.operacion === operacion );
        let acumulado = 0
        for (let i = 0; i < pre.cuotas.length; i++) {
            acumulado = pre.cuotas[i].montoAPagar + acumulado
            if(acumulado === importe){
                return i+1
            }  
        }
        throw new Error('Error al obtener cantidad de cuotas a pagar')
    } catch (error) {
        throw new Error('Error al obtener cantidad de cuotas a pagar')
        
    }
}


const consulta = async (params) => {
    try {
        const resp = await obtenerToken(params);
        const moneda = 6900;
        const numeroDoc = params.body.referencia;
        const paisDoc = 600;
        const tipoDoc = 2;

        const queryParams = `?moneda=${moneda}&numeroDoc=${numeroDoc}&paisDoc=${paisDoc}&tipoDoc=${tipoDoc}`
        const result = await axios({
            url: params.facturador.protocolo.concat(params.facturador.host).concat(queryParams),
            method: 'get',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept':'application/json',
                'X-RshkMichi-ApiKey': params.facturador.api_key,
                'X-RshkMichi-AccessToken':resp.data.accessToken
              },
            validateStatus: (status) => {
            return true; 
            },
            timeout: params.facturador.time_out,
          })

        if (typeof result.data.code !== 'undefined' && result.data.code !== "OK") {
            return {
                success:false,
                message: result.data.message,
                data:{}
            }      
            
        }
        if (result.data.prestamos.length < 1) {
            return {
                success:false,
                message: 'El cliente no tiene préstamos pendientes de pago.',
                data:{}
            }
        }
        return formateadorRespuesta(result, params.body, params.transaccion_id)
        
    } catch (error) {
        return {
            success:false,
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

        const prestamos_cliente = transaccionPadre.respuesta_facturador.respuesta_facturador.prestamos;
        const prestamo_a_pagar = params.body.operacion;
        const datos_prestamo = prestamos_cliente.find( p => p.operacion === prestamo_a_pagar );
        const numeroCuenta = transaccionPadre.respuesta_facturador.respuesta_facturador.numeroCuenta;
        const cantidadCuotas = await getCantidadCuotas(transaccionPadre.respuesta_facturador, params.body.importe_acumulado, prestamo_a_pagar);
        const { data: {accessToken, usuario} } = await obtenerToken(params);

        const parametros = {
            agenciaId: usuario.idAgencia,
            cantidadCuotas: cantidadCuotas,
            cliente: `${transaccionPadre.respuesta_facturador.respuesta_facturador.nombres} ${transaccionPadre.respuesta_facturador.respuesta_facturador.apellidos}`,
            codigoSucursalDependiente: usuario.sucursalDependiente ,
            monedaId:datos_prestamo.moneda ,
            montoAPagar: params.body.importe_acumulado ,
            numeroCuenta,
            numeroDocumento: params.body.referencia,
            paisDocumento: 600,
            prestamo: datos_prestamo,
            sucursalId: usuario.idSucursal ,
            tipoDocumento:2,
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

const reversa = async(params) => {
    try {

        const trxPago = await consultaServices.getTransaccionPadre(params.transaccion_padre_id);
        const trxConsulta = await consultaServices.getTransaccionPadre(trxPago.transaccion_padre_id);
        const respuestaFacturador = trxConsulta.respuesta_facturador.respuesta_facturador
        const prestamos_cliente = respuestaFacturador.prestamos;
        const prestamo_a_pagar = params.body.operacion;
        const datos_prestamo = prestamos_cliente.find( p => p.operacion === prestamo_a_pagar );
        const numeroCuenta = respuestaFacturador.numeroCuenta;
        const cantidadCuotas = await getCantidadCuotas(trxConsulta.respuesta_facturador, datos_prestamo.monto, prestamo_a_pagar);
        const { data: {accessToken, usuario} } = await obtenerToken(params);

        const parametros = {
            agenciaId: usuario.idAgencia,
            cantidadCuotas: cantidadCuotas,
            cliente: `${respuestaFacturador.nombres} ${respuestaFacturador.apellidos}`,
            codigoSucursalDependiente: usuario.sucursalDependiente ,
            monedaId:datos_prestamo.moneda ,
            montoAPagar: datos_prestamo.monto,
            numeroCuenta,
            numeroDocumento: params.body.referencia,
            paisDocumento: 600,
            prestamo: datos_prestamo,
            sucursalId: usuario.idSucursal ,
            tipoDocumento:2,
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