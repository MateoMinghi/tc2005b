//la idea es que guardemos la direccion en memoria de la funcion anonima

// Definición de una función anónima y asignación a la constante `mi_funcion`
const mi_funcion = () => {
    // Esta línea imprime un mensaje en la consola
    console.log("sk.djnverne.wjkn desde una función anónima");
}

// Llamada a la función anónima `mi_funcion`
mi_funcion();


//arreglos
const arreglo = ["Elemento"];
const arreglo2 = new Array();

arreglo.push("Otro elemento");

//javascript no es tan estricto con los arreglos, maneja los tamaños de manera dinamica
arreglo[10] = "Otro elemento nuevo"; //aumenta el tamaño del arreglo y agrega el elemento en la posicion 10


//arreglos asociativos (como tablas de hash)
arreglo["uno"] = 5;
console.log(); 

//recorrer arreglos
for (let i = 0; i < arreglo.length; i++) {
    console.log(arreglo[i]);
}


//recorrer arreglos con for in (posiciones)
for (let posicion in arreglo) {
    console.log(arreglo[posicion]);
}

//recorrer arreglos con for of (valores)
for (let valor of arreglo) {
    console.log(valor);
}


//Objetos
const objeto = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 25,
    direccion: {
        calle: "Calle falsa",
        numero: 123
    }
}