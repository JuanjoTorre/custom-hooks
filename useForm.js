//Custom Hook para gestionar los formularios en react

import { useState } from "react";

// Este hook debera recibir el estado del formulario
export const useForm = (initialForm = {}) => {
	//Inicializo el estado del formulario con el formulario que nos llega por argumentos
	const [formState, setFormState] = useState(initialForm);

	//Controlo los cambios en el formulario y actualizo el stado con ellos
	const onInputChange = ({ target }) => {
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	//Funcion que resetea los campos de formulario
	const onResetForm = () => {
            setFormState(initialForm)
      };

	//Devuelvo un objeto con el estado del formulario y la funcion que controla sus cambios
	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
	};
};
