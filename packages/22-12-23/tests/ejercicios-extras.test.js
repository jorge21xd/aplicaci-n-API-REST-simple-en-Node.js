const { usarForEach, usarMap, usarFilter, usarFind, sumarArray, multiplicarArray } = require('../ejercicios-extras');

xdescribe('Pruebas de métodos de array', () => {
    test('sumarArray suma correctamente los elementos del array', () => {
        const resultado = sumarArray([1, 2, 3, 4]);
        expect(resultado).toBe(10);
    });

    test('multiplicarArray multiplica correctamente los elementos del array', () => {
        const resultado = multiplicarArray([1, 2, 3, 4]);
        expect(resultado).toBe(24);
    });

    test('usarForEach modifica correctamente los elementos del array usando forEach', () => {
        const resultado = usarForEach([1, 2, 3, 4]);
        expect(resultado).toEqual([2, 4, 6, 8]);
    });

    test('usarMap transforma correctamente los elementos del array usando map', () => {
        const resultado = usarMap([1, 2, 3, 4]);
        expect(resultado).toEqual([3, 6, 9, 12]);
    });

    test('usarFilter filtra correctamente los elementos del array usando filter', () => {
        const resultado = usarFilter([1, 2, 3, 4, 5, 6]);
        expect(resultado).toEqual([2, 4, 6]);
    });

    test('usarFind encuentra correctamente un elemento en el array usando find', () => {
        const resultado = usarFind([1, 2, 3, 4], 3);
        expect(resultado).toBe(3);
    });
});
