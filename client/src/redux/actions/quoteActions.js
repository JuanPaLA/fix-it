import {GET_QUOTE_BY_FIELD, POST_QUOTE, GET_QUOTES, GET_QUOTE_BY_USER, DELETE_QUOTE } from './../actions/types';

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

export const getQuotesByUser = (id) => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/quotes/user/${id}`)
    .then(datos => datos.json())
    .catch(err => console.log(err));

    dispatch({
        type: GET_QUOTE_BY_USER,
        payload: datos
    })
}

export const postQuote = (descripcion, data, plazo, direccion, telefono, email, especialidadId, userId ) => async dispatch => { // falta agregar userId
    var init = {
        method: 'POST',
        body: JSON.stringify({descripcion, data, plazo, direccion, telefono, email, especialidadId, userId}),// falta agregar userId, barrio, especialidadId
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Content-Type': 'application/json'
        }
    };
    var url = `http://localhost:5000/api/quotes/add`;

    let resp = await fetch(url, init)
        .then(res => res.json())

    dispatch({
        type: POST_QUOTE,
        payload: resp
    });
}

export const deleteQuote = (id) => async dispatch => {
    var init = {
        method: 'DELETE'
    };

    var url = `http://localhost:5000/api/quotes/delete/${id}`;

    let resp = await fetch(url, init)
    .then(res => res.json())

    dispatch({
        type: DELETE_QUOTE,
        payload: resp
    })
}