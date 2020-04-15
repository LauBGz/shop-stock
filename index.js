function httpGetAsync(theUrl, callback)
{
    let peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function() { 
        if (peticion.readyState == 4 && peticion.status == 200){
            callback(JSON.parse(peticion.responseText));
        }
        if (peticion.status == 404){
            document.querySelector('.datosUsuario').innerHTML = `
            <div class="error">
                        Does not exist.
            </div>
            `;
        }
    }
    peticion.open("GET", theUrl, true); 
    peticion.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    peticion.send(null);
}

let urlPeticion = "https://cors-anywhere.herokuapp.com/http://prana-solutions.com/neoland/api/?";

//let {name, bio} = datosUsuarioGithub;

function crearCelda (tipoCelda, nombreCelda, filaCelda){
    let celda = document.createElement(tipoCelda);
    let datoCelda = document.createTextNode(nombreCelda);
    celda.appendChild(datoCelda);
    document.getElementById(filaCelda).appendChild(celda);
};

function imprimir (responseText){
    let resultado = document.querySelector('.resultados');
    
    if (responseText.length === 0){
        resultado.innerHTML = `
            <p class="errorBusca">No hay resultados.</p>
        `;
    }else{
        resultado.innerHTML = "";

        let tabla = document.createElement("TABLE");
        tabla.setAttribute("id", "myTable");
        document.querySelector('.resultados').appendChild(tabla);

        let fila = document.createElement("TR");
        fila.setAttribute("id", "myTrHeader");
        document.getElementById("myTable").appendChild(fila);

        crearCelda("TH", "Nombre", "myTrHeader");
        crearCelda("TH", "Categoría", "myTrHeader");
        crearCelda("TH", "Precio", "myTrHeader");
        crearCelda("TH", "Código", "myTrHeader");

        for (let index = 0; index <= responseText.length-1; index++) {
                fila = document.createElement("TR");
                fila.setAttribute("id", "myTr"+index);
                document.getElementById("myTable").appendChild(fila);

                crearCelda("TD", responseText[index]["name"], "myTr"+index);
                crearCelda("TD", responseText[index]["category"], "myTr"+index);
                crearCelda("TD", responseText[index]["price"]+"€", "myTr"+index);
                crearCelda("TD", responseText[index]["code"], "myTr"+index);
        }
    }
}

function crearUrl(url){
    let category= document.querySelector('.custom-select').value;
    let name = document.querySelector('.inputName').value;
    let codigo = document.querySelector('.inputCode').value;
    let pMin = document.querySelector('.inputMin').value;
    let pMax = document.querySelector('.inputMax').value;

    let urlParameters = "";

    if (category !== "Selecciona..."){
        urlParameters += "category=" + category;
    }

    if (name!== ""){
        if (urlParameters === ""){
            urlParameters += "name=" + name;
        }else{
            urlParameters += "&name=" + name;
        }
    }

    if (codigo !== ""){
        if (urlParameters === ""){
            urlParameters += "code=" +codigo;
        }else{
            urlParameters += "&code=" + codigo;
        }
    }

    if (pMin !== ""){
        if (urlParameters === ""){
            urlParameters += "price_min=" + pMin;
        }else{
            urlParameters += "&price_min=" + pMin;
        }
    }

    if (pMax !== ""){
        if (urlParameters === ""){
            urlParameters += "price_max=" + pMax;
        }else{
            urlParameters += "&price=" + pMax;
        }
    }

    let newUrl = urlPeticion + urlParameters;
    
    httpGetAsync(newUrl, imprimir);
    
    document.querySelector('.custom-select').value = "Selecciona...";
    document.querySelector('.inputName').value = "";
    document.querySelector('.inputCode').value = "";
    document.querySelector('.inputMin').value = "";
    document.querySelector('.inputMax').value = "";
}

document.querySelector('.botonBuscar').addEventListener("click", crearUrl);
