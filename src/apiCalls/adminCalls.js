export const getUsers = (token) => {
    return fetch(`http://localhost:8080/`, {
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
    return fetch(`http://localhost:8080/isAdmin`, {
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