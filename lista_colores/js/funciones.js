const formulario = document.querySelector("form");
const inputText = document.querySelector('input[type="text"]');
const lista = document.querySelector("ul");
const parrafoError = document.querySelector(".error");


function color({id,r,g,b}){
    let li = document.createElement("li");
    li.innerText = [r,g,b].join(",");
    li.style.backgroundColor = `rgb(${[r,g,b].join(",")})`;

    li.addEventListener("click", () => {
        fetch(`/borrar/${id}`,{
            method : "DELETE"
        })
        .then(respuesta => respuesta.json())
        .then(({resultado}) => {
            if(resultado == "ok"){
                return li.remove();
            }
            console.log("..error al usuario");
        });
    });

    return li;
}

fetch("/colores")
.then(respuesta => respuesta.json())
.then(colores => {
    colores.forEach( objColor => {
        lista.appendChild(color(objColor));
    });
});



formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    
    parrafoError.classList.remove("visible");

    let msgError = "el campo no puede estar en blanco";//error por defecto

    //si el campo está en blanco
    if(inputText.value.trim() != ""){
        
        let numeros = inputText.value.trim().split(",").map( n => n.trim() == "" ? NaN : Number(n) );

        //tenemos tres números para validar?
        let valido = numeros.length == 3;

        if(valido){
            
            let i = 0;
            
            while(valido && i < numeros.length){
                let n = numeros[i];

                valido = n - parseInt(n) == 0 && n >= 0 && n <= 255;

                i++;
            }

            if(valido){
                
                let [r,g,b] = numeros;

                return fetch("/nuevo",{
                    method : "POST",
                    body : JSON.stringify({r,g,b}),
                    headers : {
                        "Content-type" : "application/json"
                    }
                })
                .then(respuesta => respuesta.json())
                .then(({id,error}) => {
                    if(!error){
                        lista.appendChild(color({id,r,g,b}));

                        return inputText.value = "";
                    }
                    console.log("..mostrar error al usuario");
                });

                


            }

        }
        msgError = "deben ser tres valores entre 0 y 255 separados por comas";
    }
    parrafoError.innerText = msgError;
    parrafoError.classList.add("visible");
    

});