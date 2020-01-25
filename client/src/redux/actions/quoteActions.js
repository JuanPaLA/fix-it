import {GET_QUOTE_BY_FIELD, POST_QUOTE, GET_QUOTES} from './../actions/types';

export const getQuoteByField = id => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/quotes/especiality/${id}`)
    .then(datos => datos.json())
    .catch(err => console.log(err));

    dispatch({
        type: GET_QUOTE_BY_FIELD,
        payload: datos
    });
};

export const getQuotes = () => async dispatch => {
    var datos = await fetch('http://localhost:5000/api/quotes/all')
    .then(datos => datos.json())
    .catch(err => console.log(err));

    dispatch({
        type: GET_QUOTES,
        payload: datos
    })
}

export const postQuote = (descripcion, data, plazo, direccion, barrio, telefono, email, especialidadId, userId ) => async dispatch => {
    var init = {
        method: 'POST',
        body: JSON.stringify({descripcion, data, plazo, direccion, barrio, telefono, email, especialidadId, userId}),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var url = `http://localhost:5000/api/quotes/add`;

    let resp = await fetch(url, init).then(res => {
        return res.json()
      });

    dispatch({
        type: POST_QUOTE,
        payload: resp
    });
}