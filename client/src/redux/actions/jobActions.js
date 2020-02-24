import { 
    GET_JOBS, 
    POST_JOB, 
    GET_JOB_BY_BUDGET ,
    GET_JOBS_BY_USER,
    GET_JOB_BY_ID,
    GET_JOB_BY_WORKERID
} from './types';

export const getJobs = () => async dispatch => {
    var datos = await fetch('http://localhost:5000/api/jobs/all')
    .then(datos => datos.json())
    .catch(err => console.log(err));

    dispatch({
        type: GET_JOBS,
        payload: datos
    })
};

export const getJobById = (id) => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/jobs/${id}`)
    .then(datos => 
        datos.json())
    .catch(err => 
        console.log(err));

    dispatch({
        type: GET_JOB_BY_ID,
        payload: datos
    });
};


export const getJobByWorkerId = (id) => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/jobs/worker/${id}`)
    .then(datos => 
        datos.json())
    .catch(err => 
        console.log(err));

    dispatch({
        type: GET_JOB_BY_WORKERID,
        payload: datos
    });
};


export const postJob = (budgetId, quoteId, userId, titulo, precio, workerId) => async dispatch => {
    //cabeceras
    var myInit = {
    method: 'POST',
    body: JSON.stringify({budgetId, quoteId, userId, titulo, precio, workerId}),
    mode: 'cors',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Content-Type': 'application/json'
    }
  };
    var urls = `http://localhost:5000/api/jobs/add`;
    let resp = await fetch(urls, myInit)
        .then(res => 
         res.json())

    dispatch({
        type: POST_JOB,
        payload: resp
    });
}

export const getJobsByBudget = (id) => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/jobs/quote/${id}`)
    .then(datos => datos.json())
    .catch(err => console.log(err));

    dispatch({
        type: GET_JOB_BY_BUDGET,
        payload: datos
    })
};

export const getJobsByUser = (id) => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/jobs/user/${id}`)
    .then(datos => 
        datos.json())
    .catch(err => 
        console.log(err));

    dispatch({
        type: GET_JOBS_BY_USER,
        payload: datos
    });
}