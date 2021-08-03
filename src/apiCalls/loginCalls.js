import { BASE_URL } from "src/helpers/loginHelp";

export const signin = (user) => {
    return fetch(`${BASE_URL}auth/login`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => { return response.json() }).catch((err) => {
            console.log(err);
        })
};
export const register = (user) => {
    return fetch(`${BASE_URL}auth/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}
export const forget = (email) => {
    return fetch(`${BASE_URL}auth/forget`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}
export const reset = (password, token) => {
    return fetch(`${BASE_URL}auth/rest`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, token })
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}