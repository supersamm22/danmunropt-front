import { BASE_URL } from "src/helpers/loginHelp";
import { fDate, week, year } from "src/utils/formatTime";

export const uploadReport = (data, token) => {
    return fetch(`${BASE_URL}report`, {
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
    return fetch(`${BASE_URL}myreport`, {
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
    return fetch(`${BASE_URL}messocycles?userId=${id}`, {
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
    return fetch(`${BASE_URL}messocycles`, {
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
export const editMesscycle = (token, data) => {
    return fetch(`${BASE_URL}messocycles`, {
        method: 'PUT',
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
    return fetch(`${BASE_URL}nutritions?userId=${id}&date=${fDate()}`, {
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
    data.date = fDate()
    return fetch(`${BASE_URL}nutritions`, {
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
    return fetch(`${BASE_URL}habits?userId=${id}&week=${week()}&year=${year()}`, {
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
    data.week = week()
    data.year = year()
    return fetch(`${BASE_URL}habits`, {
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
    return fetch(`${BASE_URL}addComment?` + new URLSearchParams({ reportId, userId }), {
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
export const deleteMeso = (token, _id) => {
    return fetch(`${BASE_URL}messocycles`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ _id })
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

// peridization

//Habits
export const getPeriodization = (token, id) => {
    return fetch(`${BASE_URL}periodizations?userId=${id}&year=${year()}`, {
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

export const addPeriodization = (token, data) => {
    return fetch(`${BASE_URL}periodizations`, {
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

// endpoints >>> /periodizations

//     fields >>>
// userId
// week
// year
// monday
// tuesday
// wednesday
// thursday
// friday
// saturday
// sunday
// notes