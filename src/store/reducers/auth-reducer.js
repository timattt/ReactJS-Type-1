import {initialState} from "../model/initialState";
import {AuthActionTypes} from "../constants";


export const authReducer = (state = initialState(), action) => {
    switch (action.type) {
        case AuthActionTypes.login: {
            window.localStorage.setItem("type1token", action.payload)
            return {...state, token: action.payload}
        }
        case AuthActionTypes.register: {
            return {...state}
        }
        case AuthActionTypes.unLogin: {
            window.localStorage.setItem("type1token", "")
            return {...state, token: ""}
        }
        default: {
            return {...state}
        }
    }
}