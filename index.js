const express = require("express");
const {leerDatos,escribirDatos,borrarDatos} = require("./gestion_datos.js");

const servidor = express();

servidor.use(express.json());

servidor.use(express.static("./lista_colores"));

servidor.get("/colores", async (peticion,respuesta) => {

    let [error,datos] = await leerDatos();

    if(!error){
        return respuesta.json(datos);
    }

    respuesta.status(500);
    respuesta.json(error);

});

servidor.post("/nuevo", async (peticion,respuesta) => {
       
    let [error,id] = await escribirDatos(peticion.body);

    if(!error){
        return respuesta.json({id});
    }

    respuesta.json(error);

});

servidor.delete("/borrar/:id", async (peticion,respuesta) => {

    let id = Number(peticion.params.id);

    let [error] = await borrarDatos(id);

    respuesta.json({ resultado : !error ? "ok" : "ko" });

});



servidor.listen(4000);