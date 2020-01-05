import {GET_JOB_BY_QUOTE, POST_JOB} from './../actions/types';

export const getJobsByQuote = (id) => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/jobs/quote/${id}`)
    .then(datos => datos.json())
    .catch(err => console.log("error on JobActionReducer"));

    dispatch({
        type: GET_JOB_BY_QUOTE,
        payload: datos
    });
};

export const postJob = (price, plazo, quoteId) => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/jobs/add/${price}/${plazo}/${quoteId}/`)
    .then(datos => datos.json())
    .catch(err => console.log("error on JobActionReducer POST"));

    dispatch({
        type: POST_JOB,
        payload: datos
    });
}