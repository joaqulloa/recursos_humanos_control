//Funcion para obtener informacion del formulario
function informacion() {
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let fecha_nacimiento = new Date(document.getElementById("fecha-nacimiento").value);
    let trabajador_activo = document.getElementById("trabajador-activo").checked;
    let fecha_ingreso = new Date(document.getElementById("fecha-ingreso").value);
    let sueldo_actual = parseInt(document.getElementById("sueldo-actual").value);
    let sueldo_anterior = parseInt(document.getElementById("sueldo-anterior").value);
    let cargas_familiares = document.getElementById("cargas-familiares").checked;
    let cantidad_cargas = document.getElementById("cantidad-cargas").value;


    //Insertar todas la variables en un arreglo
    let informacion = [nombre, apellidos, fecha_nacimiento, trabajador_activo,
        fecha_ingreso, sueldo_actual, sueldo_anterior, cargas_familiares, cantidad_cargas
    ]


    return informacion;
}


function calcularPermanencia(fechaIngreso) {

    let fechaActual = new Date();
    let resultadoHTML = ""

    let diff = fechaActual.getTime() - fechaIngreso.getTime();

    let diasPermanencia = Math.floor(diff / (1000 * 60 * 60 * 24));
    let mesesPermanencia = (fechaActual.getFullYear() - fechaIngreso.getFullYear()) * 12;
    mesesPermanencia += fechaActual.getMonth() - fechaIngreso.getMonth();
    let aniosPermanencia = Math.floor(diasPermanencia / 365);
    let diasParaCompletarAnio = Math.floor(diff / (1000 * 60 * 60 * 24)) % 365;

    resultadoHTML += "Su permanencia en la organización es de: " + diasPermanencia + " días<br>";
    resultadoHTML += "Su permanencia en la organización es de: " + mesesPermanencia + " meses<br>";
    resultadoHTML += "Su permanencia en la organización es de: " + aniosPermanencia + " años y " + (mesesPermanencia % 12) + " meses y " + (diasPermanencia % 365) + " días<br>";
    resultadoHTML += "Para completar el año de permanencia faltan: " + (365 - diasParaCompletarAnio) + " días";

    document.getElementById("respuesta_b").innerHTML = resultadoHTML;

}


function calcularBeneficio(nombre, apellidos, sueldoActual, sueldoAnterior, cargasFamiliares) {

    //  Renta del semestre anterior
    let renta = sueldoAnterior;
    let sueldoFinal = sueldoActual

    // Declarar la variable resultado
    let resultado;

    // Calcular el valor de familiar correspondiente
    let valorFamiliar = 0;

    if (cargasFamiliares === true) {
        if (renta <= 429899) {
            valorFamiliar = 16828;
        } else if (renta > 429899 && renta <= 627913) {
            valorFamiliar = 10327;
        } else if (renta > 627913 && renta <= 979330) {
            valorFamiliar = 3264;
        } else if (renta > 979330) {
            valorFamiliar = 0;
        }
        sueldoFinal += valorFamiliar;
        resultado = `Nombre: ${nombre} ${apellidos} <br> 
        Sueldo actual: ${sueldoActual} <br> 
        Monto carga familiar: ${valorFamiliar} <br> 
        Sueldo final: ${sueldoFinal}`;

    } else {
        resultado = `Al Trabajador ${nombre} ${apellidos} no le corresponde beneficio de Carga Familiar porque no tiene carga familiar asignada.`;
    }

    document.getElementById("respuesta_c").innerHTML  =  resultado;

    return [valorFamiliar, sueldoFinal];
}

function objetoPersona(nombre, apellidos, fecha_nacimiento, trabajador_activo, fecha_ingreso, sueldo_actual, sueldo_anterior, cargas_familiares, cantidad_cargas, valor_familiar, sueldo_final) {
    let persona = new Object();
    persona.nombre = nombre;
    persona.apellidos = apellidos;
    persona.fecha_nacimiento = fecha_nacimiento.getFullYear() + "-" + fecha_nacimiento.getMonth() + "-" + fecha_nacimiento.getDay();
    if (trabajador_activo) {
        persona.trabajador_activo = "Si"
    } else {
        persona.trabajador_activo = "No"
    }
    persona.fecha_ingreso = fecha_ingreso.getFullYear() + "-" + fecha_ingreso.getMonth() + "-" + fecha_ingreso.getDay();
    persona.sueldo_actual = sueldo_actual;
    persona.sueldo_anterior = sueldo_anterior;
    if (cargas_familiares) {
        persona.cargas_familiares = "Si"
    } else {
        persona.cargas_familiares = "No"
    }
    if (cargas_familiares){
        persona.cantidad_cargas = cantidad_cargas;
    }
    else {persona.cantidad_cargas = 0}
    
    persona.valor_familiar = valor_familiar;
    persona.sueldo_final = sueldo_final;

    resultado = `Nombre: ${persona.nombre} <br> 
    Apellidos: ${persona.apellidos} <br> 
    Fecha de nacimiento: ${persona.fecha_nacimiento} <br> 
    ¿Trabajador activo?: ${persona.trabajador_activo} <br> 
    Fecha de ingreso: ${persona.fecha_ingreso} <br> 
    Sueldo actual: ${persona.sueldo_actual} <br> 
    Sueldo anterior: ${persona.sueldo_anterior} <br> 
    Cargas familiares: ${persona.cargas_familiares} <br> 
    Cantidad cargas: ${persona.cantidad_cargas} <br> 
    Valor familiar: ${persona.valor_familiar} <br> 
    Sueldo final: ${persona.sueldo_final} <br> 
    `;

    document.getElementById("respuesta_d").innerHTML  =  resultado;

}



function respuestas() {
    let info = informacion();
    calcularPermanencia(info[4]);
    let calculos = calcularBeneficio(info[0], info[1], info[5], info[6], info[7]);
    objetoPersona(info[0], info[1], info[2], info[3], info[4], info[5], info[6], info[7], info[8], calculos[0], calculos[1]);
}