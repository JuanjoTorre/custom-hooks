// CUSTOM HOOK PARA USARSE COMO CONTADOR

import { useState } from "react";

// funcion del hook con un valor inicial de cero
export const useCounter = (initialValue = 0) => {
	//Usamos el useState para controlar el estado del componente
	const [counter, setCounter] = useState(initialValue);

      //Metodo que gestiona el incremento del counter en base al valor pasado como parametro. 1 por defecto
	const increment = (value=1) => {
		setCounter(counter + value);
	};
      //Metodo que gestiona el decremento del counter en base al valor pasado como parametro. 1 por defecto
      //El valor del counter no puede bajar de cero
	const decrement = (value = 1) => {
		if ((counter - value) < 0 )
                  {
                        setCounter(0) ;
                        return;
                  }  
		setCounter(counter - value);
	};
      //Metodo que resetea el valor del counter al valor inicial
	// const reset = () => {
	// 	setCounter(initialValue);
	// };
	function reset(){
		setCounter(initialValue);
	}

      //Devolvemos el valor del counter y sus metodos
	return {
		counter: counter,
		increment: increment,
		decrement: decrement,
		reset: reset,
	};
};
