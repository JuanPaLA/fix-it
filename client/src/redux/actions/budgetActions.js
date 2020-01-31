import {GET_BUDGET_BY_QUOTE, POST_BUDGET} from './types';

export const getJobsByQuote = (id) => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/budgets/quote/${id}`)
    .then(datos => datos.json())
    .catch(err => console.log("error on BudgetActionReducer"));

    dispatch({
        type: GET_BUDGET_BY_QUOTE,
        payload: datos
    });
};

export const postBudget = (precio, quoteId, mensaje, workerId, userId) => async dispatch => { // falta agregar plazo
    //cabeceras
    var myInit = {
    method: 'POST',
    body: JSON.stringify({precio, mensaje, quoteId, workerId, userId}), 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Content-Type': 'application/json'
    }
  };
    var urls = `http://localhost:5000/api/budgets/add`;

    let resp = await fetch(urls, myInit)
        .then(res => res.json())
        
    dispatch({
        type: POST_BUDGET,
        payload: resp
    });
}