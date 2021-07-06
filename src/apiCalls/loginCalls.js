export const signin = (user) => {
    return fetch(`http://localhost:8080/auth/login`,
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
    return fetch(`http://localhost:8080/auth/register`, {
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