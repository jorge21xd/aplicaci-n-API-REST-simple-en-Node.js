const {
	mayuscula,
	invocarCallback,
	operacionMatematica,
	sumarArray,
	forEach,
	map,
	filter,
} = require('../ejercicios');


describe('mayuscula(nombre)', function() {
	it('Debería devolver el mismo nombre con la primera letra en mayúscula', function() {
		expect(mayuscula("mario")).toBe("Mario");
		expect(mayuscula("ana")).toBe("Ana");
	});
});

describe('invocarCallback(cb)', function() {
  it('Debería invocar la devolución de llamada que se pasa en', function() {
		const cb = jest.fn();
		invocarCallback(cb);
    	expect(cb).toHaveBeenCalled();
  });
});

describe('operacionMatematica(n1, n2, cb)', function() {
	it('Debería devolver la función de devolución de llamada pasándole los argumentos recibidos', function() {
		const cb = jest.fn();
		operacionMatematica(100, 20, cb);
		expect(cb).toHaveBeenCalled();
	});
});

describe('sumarArray(cb)', function() {
	it('Debería pasar la suma de todos los números de la matriz a cb', function(done) {
		sumarArray([1, 2, 3, 4, 5], function(sum) {
			expect(sum).toBe(15);
			done();
		});
	});
});

describe('forEach(arr, cb)', function() {
	it('Debe pasar todos los elementos de la matriz uno por uno a cb', function() {
		const nums = [];
		forEach([1, 2, 3, 4, 5], function(num) {
			nums.push(num);
		});
		expect(nums).toEqual([1, 2, 3, 4, 5]);
	});
});

describe('map(arr, cb)', function() {
	it('Debería devolver una matriz de todos los elementos de la matriz procesados', function() {
		const squares = map([1, 2, 3, 4, 5], function(num) {
			return num * num;
		});
		expect(squares).toEqual([1, 4, 9, 16, 25]);
	});
});

describe('filter(array)', function() {
	it('Debería devolver una matriz que contenga las palabras que comienzan con "a"', function() {
		const array = ['abajo', 'pera', 'escalera', 'alerta', 'indice', 'azteca', 'arbol', 'buzo'];
		expect(filter(array)).toEqual(["abajo", "alerta", "azteca", "arbol"]);
	});
});

// Quita el skip para que corra esta última prueba

describe.skip('listaDeTareas', () => {
  test('Agregar y obtener tareas pendientes', () => {
    const { agregarTarea, obtenerTareasPendientes } = listaDeTareas();

    agregarTarea('Hacer la compra');
    agregarTarea('Estudiar para el examen');
    agregarTarea('Llamar a Juan');

    const tareasPendientes = obtenerTareasPendientes();
    expect(tareasPendientes.length).toBe(3);
    expect(tareasPendientes[0].tarea).toBe('Hacer la compra');
    expect(tareasPendientes[1].completada).toBe(false);
  });

  test('Marcar tarea como completada', () => {
    const { marcarComoCompletada, obtenerTareasPendientes } = listaDeTareas();

    marcarComoCompletada(1); // Marcar la segunda tarea (índice 1) como completada

    const tareasPendientes = obtenerTareasPendientes();
    expect(tareasPendientes.length).toBe(2);
    expect(tareasPendientes[1].completada).toBe(true);
  });

  test('Intento marcar tarea fuera de índice como completada', () => {
    const { marcarComoCompletada, obtenerTareasPendientes } = listaDeTareas();

    marcarComoCompletada(5); // Intenta marcar una tarea fuera de índice

    const tareasPendientes = obtenerTareasPendientes();
    expect(tareasPendientes.length).toBe(2); // La cantidad de tareas pendientes no cambia
    expect(tareasPendientes[0].completada).toBe(false);
    expect(tareasPendientes[1].completada).toBe(true);
  });
});