export const signin = (user) => {
    return fetch(`https://api.danmunropt.com/auth/login`,
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
    return fetch(`https://api.danmunropt.com/auth/register`, {
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