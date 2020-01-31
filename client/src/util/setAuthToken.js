import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;



/* 
Creo que lo hace esto es permitir o no las acciones de axios
dependiendo si hay o no un token.

We’ll use this to set and delete the Authorization header for our axios requests depending on whether a user is logged in or not (remember in Part 1 how we set an Authorization header in Postman when testing our private api route?).
Let’s place the following in setAuthToken.js.


*/