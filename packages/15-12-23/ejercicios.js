/*
3.- Suma de un Rango de Números:
Calcule la suma de todos los números enteros en un rango dado, incluyendo ambos extremos. La función debe tomar dos números enteros como parámetros y devolver la suma de todos los números enteros (positivos o negativos) entre ellos, incluso si los parámetros están en orden descendente.
*/

function sumaDeRango(numInicio, numFinal) {
  // Tu código aquí
  /*
let suma = 0;
for(let i = numInicio; i<=numFinal;i++){
  suma+=1;
}
return suma;
*/
let suma = 0;
for (let i = numInicio; i <= numFinal; i++) {
  suma += i;
}
return suma;
}

/*
  * 4.- Encontrar el Carácter Más Frecuente:
  Desarrolla una función en JavaScript que, dada una cadena de texto, identifique y devuelva el primer carácter que aparece con mayor frecuencia. La función debe considerar todos los caracteres y no distinguir entre mayúsculas y minúsculas. En caso de que varios caracteres tengan la misma frecuencia máxima, la función deberá retornar un string que contenga únicamente el primer carácter encontrado.

  * EXTRA OPCIONAL: En caso de que varios caracteres tengan la misma frecuencia máxima, la función deberá retornar un array con todos estos caracteres.
  
  Consideraciones:
  - La función debe recibir una cadena de texto como parámetro.
  - Debe considerar todos los caracteres, sin distinción entre mayúsculas y minúsculas.
  - Identificar el carácter que aparece con mayor frecuencia en la cadena.
  - En caso de que varios caracteres tengan la misma frecuencia máxima, la función debe retornar solo el primer carácter encontrado.
  - La función debe retornar un string que contenga únicamente el carácter identificado.
  - Se espera que el código sea claro, legible y eficiente en cuanto a rendimiento.
  - Considerar casos límite y manejar posibles errores o situaciones inesperadas de manera apropiada.
*/

function caracteresMasFrecuentes(cadena) {
  //Tu código aquí
    // Convertir la cadena a minúsculas para no distinguir entre mayúsculas y minúsculas
    const lowerCaseString = cadena.toLowerCase();

    // Objeto para almacenar la frecuencia de cada carácter
    const charFrequency = {};
  
    // Calcular la frecuencia de cada carácter en la cadena
    for (let char of lowerCaseString) {
      if (char !== ' ') { // Ignorar espacios en blanco
        charFrequency[char] = (charFrequency[char] || 0) + 1;
      }
    }
  
    let maxChar = '';
    let maxCount = 0;
  
    // Encontrar el carácter con la frecuencia máxima
    for (let char in charFrequency) {
      if (charFrequency[char] > maxCount) {
        maxCount = charFrequency[char];
        maxChar = char;
      }
    }
  
    return maxChar;
}

module.exports = { 
  sumaDeRango,
  caracteresMasFrecuentes
}