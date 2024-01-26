const {
  sumaDeRango,
  caracteresMasFrecuentes
} = require('../ejercicios.js');


describe('Suma de un Rango de Números', () => {
  test('Debería devolver 15 para el rango 1 a 5', () => {
    expect(sumaDeRango(1, 5)).toBe(15);
  });
  
  test('Debería devolver 33 para el rango 3 a 8', () => {
    expect(sumaDeRango(3, 8)).toBe(33);
  });
  
  test('Debería devolver 0 para el rango -2 a 2', () => {
    expect(sumaDeRango(-2, 2)).toBe(0);
  });
})

describe('Encontrar el Carácter Más Frecuente', () => {
  test('Debería devolver "g" para la cadena "programming"', () => {
    expect(caracteresMasFrecuentes("programming")).toEqual("r");
  });
  
  test('Debería devolver "l" para la cadena "hello"', () => {
    expect(caracteresMasFrecuentes("hello")).toEqual("l");
  });
  
  test('Debería devolver "a" para la cadena "javascript"', () => {
    expect(caracteresMasFrecuentes("javascript")).toEqual("a");
  });
})