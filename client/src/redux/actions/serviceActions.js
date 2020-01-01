import {GET_SERVICES} from './../actions/types';

export const getServices = () => async dispatch => {
    var datos = await fetch('http://localhost:5000/api/services/all')
      .then(datos => datos.json())
      .catch(err => console.log(err));
  
    dispatch({
      type: GET_SERVICES,
      payload: datos
    });
  };