import {
    GET_BUDGET_BY_QUOTE, 
    POST_BUDGET, 
    DELETE_BUDGET_BY_QUOTE,
    REJECT_BUDGET,
    GET_BUDGET_BY_ID,
    GET_BUDGET_BY_WORKERID
} from './types';

export const getBudgetsByQuote = (id) => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/budgets/quote/${id}`)
    .then(datos => datos.json())
    .catch(err => console.log("error on BudgetActionReducer"));

    dispatch({
        type: GET_BUDGET_BY_QUOTE,
        payload: datos
    });
};

export const getBudgetById = (id) => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/budgets/get/${id}`)
    .then(datos => datos.json())
    .catch(err => console.log("error on BudgetActionReducer"));

    dispatch({
        type: GET_BUDGET_BY_ID,
        payload: datos
    });
};

export const getBudgetByWorkerId = (id) => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/budgets/worker/${id}`)
    .then(datos => 
        datos.json())
    .catch(err => 
        console.log("error on BudgetActionReducer"));

    dispatch({
        type: GET_BUDGET_BY_WORKERID,
        payload: datos
    });
};

export const postBudget = (precio, quoteId, mensaje, workerId, userId, titulo) => async dispatch => { // falta agregar plazo
    //cabeceras
    var myInit = {
    method: 'POST',
    body: JSON.stringify({precio, mensaje, quoteId, workerId, userId, titulo}), 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Content-Type': 'application/json'
    }
  };
    var urls = `http://localhost:5000/api/budgets/add/${quoteId}`;
    let resp = await fetch(urls, myInit)
        .then(res => 
            res.json())
        
    dispatch({
        type: POST_BUDGET,
        payload: resp
    });
}

export const deleteBudgetByQuote = (id) => async dispatch => {
    var init = {
        method: 'DELETE'
    };

    var url = `http://localhost:5000/api/budgets/delete/byquote/${id}`;
    let resp = await fetch(url, init)
    .then(res => res.json())

    dispatch({
        type: DELETE_BUDGET_BY_QUOTE,
        payload: resp
    })
}

export const rejectBudget = (id) => async dispatch => {
    var init = {
        method: 'PUT'
    }

    var url = `http://localhost:5000/api/budgets/rejectbyquoteid/${id}`;
    let respo = await fetch(url, init)
    .then(res => res.json())

    dispatch({
        type: REJECT_BUDGET,
        payload: respo
    })
}