import {
    GET_CHAT_BY_JOBID
} from './types';

export const getChatByJobId = (id) => async dispatch => {
    var datos = await fetch(`http://localhost:5000/api/chats/job/${id}`)
    .then(datos => datos.json())
    .catch(err => console.log(err));

    dispatch({
        type: GET_CHAT_BY_JOBID,
        payload: datos
    })
};