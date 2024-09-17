

export const todoReducer = ( initialState = [] , action) => {

      //Compruebo que la action sea del tipo adecuado
      switch (action.type) {
            case '[TODO] add todo':
                  //Si la action es la de añadir, devuelvo el initialState añadiendole los datos de la action
                  return [ ...initialState, action.payload];

                  
            case '[TODO] Remove Todo':
                  //Si la action es la de borrar un todo, devuelvo el initialState filtrado por aquellos que no coincidan con el id del borrado
                  return initialState.filter(todo => todo.id !== action.payload )
            
                  //Si la action es la de toggle un todo, devuelvo el initialState mapeado y le cambio el done por el contrario
            case '[TODO] Toggle Todo':
                  return initialState.map(todo => {
                        if( todo.id === action.payload ) {
                              return {
                                    ...todo,
                                    done: !todo.done
                              }
                        }
                        return todo;
                  })
            //Si la action no es correcta devuelvo el initialState sin modificar
            default:
                  return initialState;
      }
}