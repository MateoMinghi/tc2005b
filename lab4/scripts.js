// Ejercicio 1: Tabla de cuadrados y cubos
function generarTabla() {
    const numero = parseInt(prompt("Ingresa un número:"));
    if (isNaN(numero) || numero <= 0) {
        document.getElementById("resultadoTabla").innerHTML = "Por favor ingresa un número válido mayor a 0";
        return;
    }
    
    let tablaHTML = "<table border='1'><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>";
    for (let i = 1; i <= numero; i++) {
        tablaHTML += `<tr><td>${i}</td><td>${i * i}</td><td>${i * i * i}</td></tr>`;
    }
    tablaHTML += "</table>";
    document.getElementById("resultadoTabla").innerHTML = tablaHTML;
}

// Ejercicio 2: Suma de números aleatorios
function probarSuma() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const inicio = Date.now();
    
    const respuesta = parseInt(prompt(`¿Cuánto es ${num1} + ${num2}?`));
    const tiempoTranscurrido = (Date.now() - inicio) / 1000;
    
    const resultado = num1 + num2;
    const esCorrecta = respuesta === resultado;
    
    document.getElementById("resultadoSuma").innerHTML = 
        `Respuesta ${esCorrecta ? "correcta" : "incorrecta"}.<br>
         Tiempo: ${tiempoTranscurrido.toFixed(2)} segundos`;
}

// Ejercicio 3: Contador de números
function contador(arreglo) {
    let negativos = 0, ceros = 0, positivos = 0;
    
    for (const num of arreglo) {
        if (num < 0) negativos++;
        else if (num === 0) ceros++;
        else positivos++;
    }
    
    return { negativos, ceros, positivos };
}

// Prueba del contador
function probarContador() {
    const arreglos = [
        [-1, 0, 2, -3, 4, 0, 5],
        [0, 0, 0],
        [-1, -2, -3],
        [1, 2, 3]
    ];
    
    let resultadoHTML = "<h4>Pruebas de contador:</h4>";
    
    arreglos.forEach(arr => {
        const resultado = contador(arr);
        resultadoHTML += `
            Arreglo: [${arr}]<br>
            Negativos: ${resultado.negativos}, 
            Ceros: ${resultado.ceros}, 
            Positivos: ${resultado.positivos}<br><br>`;
    });
    
    document.getElementById("resultadoContador").innerHTML = resultadoHTML;
}

// Ejercicio 4: Promedios de matriz
function promedios(matriz) {
    return matriz.map(fila => 
        fila.reduce((sum, num) => sum + num, 0) / fila.length
    );
}

// Prueba de promedios
function probarPromedios() {
    const matrices = [
        [[1,2,3], [4,5,6], [7,8,9]],
        [[10,20], [30,40,50]],
        [[1], [2], [3]]
    ];
    
    let resultadoHTML = "<h4>Pruebas de promedios:</h4>";
    
    matrices.forEach(matriz => {
        const resultado = promedios(matriz);
        resultadoHTML += `
            Matriz: ${JSON.stringify(matriz)}<br>
            Promedios: ${JSON.stringify(resultado)}<br><br>`;
    });
    
    document.getElementById("resultadoPromedios").innerHTML = resultadoHTML;
}

// Ejercicio 5: Número inverso
function inverso(numero) {
    return parseInt(Math.abs(numero).toString().split('').reverse().join('')) * Math.sign(numero);
}

// Prueba de inverso
function probarInverso() {
    const numeros = [123, -456, 1000, 0, -12345];
    
    let resultadoHTML = "<h4>Pruebas de inverso:</h4>";
    
    numeros.forEach(num => {
        resultadoHTML += `
            Número: ${num}<br>
            Inverso: ${inverso(num)}<br><br>`;
    });
    
    document.getElementById("resultadoInverso").innerHTML = resultadoHTML;
}

// Ejercicio 6: Conversor de temperatura
class ConversorTemperatura {
    constructor() {
        this.temperaturas = [];
    }
    
    celsiusAFahrenheit(celsius) {
        const fahrenheit = (celsius * 9/5) + 32;
        this.temperaturas.push({ celsius, fahrenheit });
        return fahrenheit;
    }
    
    fahrenheitACelsius(fahrenheit) {
        const celsius = (fahrenheit - 32) * 5/9;
        this.temperaturas.push({ celsius, fahrenheit });
        return celsius;
    }
    
    obtenerHistorial() {
        return this.temperaturas;
    }
}

function probarConversor() {
    const conversor = new ConversorTemperatura();
    const temperaturas = [0, 25, 100, -40];
    
    let resultadoHTML = "<h4>Pruebas de conversión de temperatura:</h4>";
    
    temperaturas.forEach(temp => {
        const fahrenheit = conversor.celsiusAFahrenheit(temp);
        resultadoHTML += `
            ${temp}°C = ${fahrenheit.toFixed(1)}°F<br>`;
    });
    
    resultadoHTML += "<br>Historial de conversiones:<br>";
    conversor.obtenerHistorial().forEach(registro => {
        resultadoHTML += `
            ${registro.celsius}°C ↔ ${registro.fahrenheit.toFixed(1)}°F<br>`;
    });
    
    document.getElementById("resultadoConversor").innerHTML = resultadoHTML;
}

// Función que se ejecuta al cargar la página
window.onload = function() {
    // Ejecutar todos los ejercicios automáticamente
    generarTabla();
    probarSuma();
    probarContador();
    probarPromedios();
    probarInverso();
    probarConversor();
};