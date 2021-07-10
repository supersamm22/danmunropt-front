export const getUsers = (token) => {
    // http://localhost:8080/
    return fetch(`https://api.danmunropt.com/`, {
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
    return fetch(`https://api.danmunropt.com/isAdmin`, {
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