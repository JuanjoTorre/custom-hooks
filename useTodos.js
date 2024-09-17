//Custom Hook para separar logica del TodoApp.jsx

import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

//Creamos el initialState en blanco
const initialState = [];

//Funcion que sirve para hacer persistente la informacion en el localStorage
const init = () => {
	return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
	//Creo el useReducer y le paso el reducer , el initial state y la funcion que inicializa el estado inicial
	const [todos, dispatch] = useReducer(todoReducer, initialState, init);

	//Creo un useEffect para gestionar el guardado de los todos en el localStorage que se disparara cuando el componente se monte y cuando cambien los todos
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	//Funcion que añade un todo al listado de todos
	const handleNewTodo = (todo) => {
		const action = {
			type: "[TODO] add todo",
			payload: todo,
		};
		dispatch(action);
	};

	//Funcion que borra un todo del listado de todos
	const handleDeleteTodo = (id) => {
		dispatch({
			type: "[TODO] Remove Todo",
			payload: id,
		});
	};
	//Funcion que hace el toggle en el todo
	const handleToggleTodo = (id) => {
		dispatch({
			type: "[TODO] Toggle Todo",
			payload: id,
		});
	};

	return {
		todos,
		todosCount: todos.length,
		pendingTodosCount: todos.filter((todo) => !todo.done).length,
		handleDeleteTodo,
		handleNewTodo,
		handleToggleTodo,
	};
};
