import { GET_JOBS, POST_JOB, GET_JOB_BY_BUDGET } from './types';

export const getJobs = () => async dispatch => {
    var datos = await fetch('http://localhost:5000/api/jobs/all')
    .then(datos => datos.json())
    .catch(err => console.log(err));

    dispatch({
        type: GET_JOBS,
        payload: datos
    })
};

export const postJob = (precio) => async dispatch => {
    //cabeceras
    var myInit = {
    method: 'POST',
    body: precio,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  };
    //url
    var urls = `http://localhost:5000/api/jobs/add`;

    let resp = await fetch(urls, myInit).then(res => {
        return res.json()
      });

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