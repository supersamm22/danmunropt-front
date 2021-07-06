
export const authenticate = (jwt, next) => {
    //just to add a field of expiry to the code.
    var oneDay = 24 * 60 * 60 * 1000;
    const expireTime = Date.now() + oneDay;
    if (typeof window !== "undefined") {
        localStorage.setItem("auth_PO", JSON.stringify(jwt))
        localStorage.setItem("time_PO", expireTime)
    }
    next()
}

export const isLoggedIn = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("auth_PO")) {
        return JSON.parse(localStorage.getItem("auth_PO"))
    }
    else
        return false;
}