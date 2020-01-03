import {GET_QUOTE_BY_FIELD} from './../actions/types';

export const getQuoteByField = id => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/quotes/especiality/${id}`)
    .then(datos => datos.json())
    .catch(err => console.log(err));

    dispatch({
        type: GET_QUOTE_BY_FIELD,
        payload: datos
    });
};