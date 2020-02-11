import {
    POST_MESSAGE
} from './types';

export const postMessage = (chatId, emiter, message) => async dispatch => {
    var init = {
        method: 'POST',
        body: JSON.stringify({chatId,emiter, message}),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
        'Content-Type': 'application/json'
        }
    };
    var url = `http://localhost:5000/api/messages/add`;
    let resp = await fetch(url, init)
    .then(res => 
        res.json())

        dispatch({
            type: POST_MESSAGE,
            payload: resp
        });
}
