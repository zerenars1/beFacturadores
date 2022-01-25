-- getDeuda
SELECT
   *,
   COALESCE (Sum(MAIN.IMPORTE_ACUMULADO + MAIN.IMPORTE_MORA_ACUMULADO) OVER (partition BY NRO_OPERACION 
ORDER BY
   MAIN.FECHA_VENCIMIENTO), 0) :: int IMPORTE_TOTAL_ACUMULADO 
FROM
   (
      SELECT
         *,
         COALESCE(sum(TMP.IMPORTE) OVER (partition BY NRO_OPERACION 
      ORDER BY
         TMP.FECHA_VENCIMIENTO), 0) :: int IMPORTE_ACUMULADO,
         COALESCE(sum(TMP.IMPORTE_MORA) OVER (partition BY NRO_OPERACION 
      ORDER BY
         TMP.FECHA_VENCIMIENTO), 0) :: int IMPORTE_MORA_ACUMULADO 
      FROM
         (
            SELECT
               D.ID,
               D.NOMBRE,
               D.NRO_OPERACION,
               D.FECHA_VENCIMIENTO,
               D.DIAS_ATRASO,
               D.MORA_PARAMETRO_ID,
               D.IMPORTE,
               D.IMPORTE_MORA,
               row_number() OVER (partition BY NRO_OPERACION 
            ORDER BY
               FECHA_VENCIMIENTO) AS ROWNUM 
            FROM
               FACTURADOR_WEB.DEUDA D 
            WHERE
               D.REFERENCIA = :referencia 
               AND D.SERVICIO_ID = :servicio_id
               AND D.PAGO_ID IS NULL
         )
         TMP 
      WHERE
         ROWNUM <= :PROXIMAS_A_VENCER
   )
   MAIN