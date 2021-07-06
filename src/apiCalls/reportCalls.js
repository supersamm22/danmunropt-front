export const uploadReport = (data, token) => {
    console.log('token: ' + token);
    return fetch(`http://localhost:8080/report`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(response => { return response.json() }).catch((err) => {
        console.log(err);
    });
}
export const lastReport = (token) => {
    console.log('token: ' + token)
    return fetch(`http://localhost:8080/myreport`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}
export const submitComment = (token, data, reportId, userId) => {

    return fetch(`http://localhost:8080/addComment?` + new URLSearchParams({ reportId, userId }), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}