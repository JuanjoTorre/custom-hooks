/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState} from "react";

//Creamos el almacenamiento del caché
const localCache = {};


export const useFetch = (url) => {

      
      //Creamos el useState y lo inicializamos
      const [ state, setState ] = useState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
      });

      //Creo un useEffect que llama a la funcion getFetch al montar el componente y cuando la url cambie
      useEffect(() => {
        getFetch(); 
      }, [url])
      
      //Funcion que se va a encargar de volver el state a su posicion inicial
      const setLoadingState = () => {
            setState({
                  data: null,
                  isLoading: true,
                  hasError: false,
                  error: null,
            });
      };

      //Funcion que obtiene los datos de la url
      const getFetch = async() => {

            //Comprobamos si la informacion que queremos esta en el caché y no tenemos que conectarnos
            if(localCache[url]){
                  console.log(localCache[url]);
                  setState({
                        data: localCache[url],
                        isLoading: false,
                        hasError: false,
                        error: null,
                  });
                  return; //Salimos de la funcion
            };

            //Antes de hacer el fetch pongo el state en su posicion inicial
            setLoadingState();

            const resp = await fetch(url);

            //Slep
            await new Promise ( resolve => setTimeout(resolve, 1500));

            //Si la respuesta falla...
            if(!resp.ok){
                  setState({
                        data: null,
                        isLoading: false,
                        hasError: true,
                        error:{
                              code: resp.status,
                              message: resp.statusText,
                        },
                        
                  });
                  return;
            };

            //Convertimos la respuesta a json
            const data = await resp.json();

            //Alimentamos el state con la data
            setState({
                  data:data,
                  isLoading:false,
                  hasError: false,
                  error: null,
            }),

            //Alimento el caché con la data que recibo de la url
            localCache[url] = data;
      };

	return {
            data: state.data,
            isLoading: state.isLoading,
            hasError: state.hasError,
      };
};
