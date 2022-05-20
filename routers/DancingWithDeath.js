const express = require("express");
const route = express.Router();
const pg = require("pg");
const config = require('../config/BDPG');

const pool = new pg.Pool(config);

route.get('/HORA_POR_FECHA/:fecha', async(request, response)=>{
    let fecha = String(request.params.fecha);
    try {
        const respuesta = await pool.query(`
        select DISTINCT ntime 
        from dancingdate 
        where ddate = '${fecha}';
        `)

        response.status(200).json({
            data : respuesta.rows
        })
        
    } catch (error) {
        response.status(406).json({
            "result": "Error con el dato de consulta",
        })
    }finally{
        pool.end
    }
})

route.get('/CITA_POR_DIA/:fecha', async(request, response)=>{
    let fecha = String(request.params.fecha);
    try {
        const respuesta = await pool.query(`
        select ndancing_id, sname, ddate, ntime, scontact 
        from DANCINGDATE 
        WHERE DDATE = '${fecha}';
        `)

        response.status(200).json({
            data : respuesta.rows
        })
        
    } catch (error) {
        response.status(406).json({
            "result": "Error con el dato de consulta",
        })
    }finally{
        pool.end
    }
});

route.post('/ASIGNAR_CITA', async(request, response)=>{

    if(!request.body.SNAME && !request.body.DDATE && !request.body.NTIME && !request.body.SCONTACT && parseInt(new Date(request.body.DDATE).getDay() >= 5)){
        response.status(400).json({
            'error': 'Bad Request'
        })
    }else{

        let SNAME = request.body.SNAME;
        let DDATE = request.body.DDATE;
        let NTIME = request.body.NTIME;
        let SCONTACT = request.body.SCONTACT;

        console.log(request.body);

        try {

            let NDACING_ID = await pool.query(`SELECT NEXTVAL('SEQ_DANCING_ID')`)
            console.log(NDACING_ID.rows[0].nextval);
            await pool.query(`
            INSERT INTO DANCINGDATE (ndancing_id, sname, ddate, ntime,scontact) 
            VALUES (${NDACING_ID.rows[0].nextval}, '${SNAME}', '${DDATE}', '${NTIME.slice(0,-3)}', '${SCONTACT}')            
            `)

            response.status(200).json({
                'result': `Cita creada el dia ${DDATE} a las ${NTIME}`
            })

        } catch (error) {
            response.status(406).json({
                'error': 'Not Acceptable'
            })
        }finally{
            pool.end
        }

    }
 
});

module.exports = route;