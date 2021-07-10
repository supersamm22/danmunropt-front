import { BASE_URL } from "src/helpers/loginHelp";

export const getUsers = (token) => {
    // http://localhost:8080/
    return fetch(BASE_URL, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => { return response.json() }).catch((err) => {
            console.log(err);
        });
};
export const checkAdmin = (token) => {
    return fetch(`${BASE_URL}isAdmin`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}