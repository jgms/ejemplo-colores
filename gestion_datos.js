const { writeFile, readFile } = require("fs");

function leerDatos(){
    return new Promise((ok) => {
        readFile("./datos/colores.txt", (error, contenido) => {
            if(!error){
                return ok([null,JSON.parse(contenido.toString())]);
            }
            ok([{ error : "error leyendo datos" }]);
        });
    });
}

function escribirDatos(nuevoColor){
    return new Promise(ok => {
        leerDatos()
        .then(([error,colores]) => {
            if(error){
                return ok([error]);
            }

            let id = colores.length > 0 ? colores[colores.length - 1].id + 1 : 1;

            nuevoColor.id = id;

            colores.push(nuevoColor);

            writeFile("./datos/colores.txt", JSON.stringify(colores), error => {
                if(!error){
                    return ok([null,id]);
                }
                ok([{ error : "error escribiendo datos" }]);
            });

        });
    });
}

function borrarDatos(id){
    return new Promise(ok => {
        leerDatos()
        .then(([error,colores]) => {
            if(error){
                return ok([error]);
            }

            colores = colores.filter( color => color.id != id);

            writeFile("./datos/colores.txt", JSON.stringify(colores), error => {
                if(!error){
                    return ok([null]);
                }
                ok([{ error : "error escribiendo datos" }]);
            });

        });
    });
}

module.exports = {leerDatos,escribirDatos,borrarDatos};


