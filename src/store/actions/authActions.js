import {AuthActionTypes, AuthResultTypes} from "../constants";

const auth_url = "http://" + process.env.REACT_APP_BACKEND_IP + ":" + process.env.REACT_APP_BACKEND_PORT + "/users"


export function register(name, password, callback) {
    console.log("Register with name=" + name + " password=" + password)
    return dispatch => {
        const body = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: name, password: password})
        }
        return fetch(auth_url + '/register', body).then(() => {
            callback(AuthResultTypes.success)
            dispatch({type: AuthActionTypes.register})
        }).catch(err => {
            console.log("Error while fetching in register: " + err)
            callback(AuthResultTypes.error)
        })
    }
}

export function login(name, password, callback) {
    console.log("Login with name=" + name + " password=" + password)
    return dispatch => {
        const body = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: name, password: password})
        }
        return fetch(auth_url + '/login', body).then(response => response.json()).then((res) => {
            dispatch({type: AuthActionTypes.login, payload: res.token})
            callback(AuthResultTypes.success)
        }).catch(err => {
            console.log("Error while fetching in login: " + err)
            callback(AuthResultTypes.error)
        })
    }
}

export function unlogin() {
    console.log("Unlogin")
    return dispatch => {
        dispatch({type: AuthActionTypes.unLogin})
    }
}