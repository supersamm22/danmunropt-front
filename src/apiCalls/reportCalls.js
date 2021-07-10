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

//Messocycle

export const getMessocycle = (token, id) => {
    console.log('token: ' + token)
    return fetch(`http://localhost:8080/messocycles?userId=${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => { console.log("gm", err) })
}

export const addMesscycle = (token, data) => {
    return fetch(`http://localhost:8080/messocycles`, {
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

//Nutrition

export const getNutrition = (token, id) => {
    console.log('token: ' + token)
    return fetch(`http://localhost:8080/nutritions?userId=${id}&date=10-07-2021`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => { console.log("gm", err) })
}

export const addNutrition = (token, data) => {
    data.date = "10-07-2021"
    return fetch(`http://localhost:8080/nutritions`, {
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

//Habits
export const getHabit = (token, id) => {
    console.log('token: ' + token)
    return fetch(`http://localhost:8080/habits?userId=${id}&week=1`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => { console.log("gm", err) })
}

export const addHabit = (token, data) => {
    data.week = 1
    return fetch(`http://localhost:8080/habits`, {
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

//Submit Comment

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