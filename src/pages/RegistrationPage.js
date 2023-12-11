import {useReducer} from "react";
import styles from './../styles/RegistrationPage.module.scss'
import {connect} from "react-redux";
import {register} from "../store/actions/authActions";
import {useNavigate} from "react-router-dom";
import {AuthResultTypes} from "../store/constants";

const actionTypes = {
    nameChanged: "NAME_CHANGED",
    passwordChanged: "PASSWORD_CHANGED",
    passwordConfirmationChanged: "PASSWORD_CONFIRM_CHANGED",
    infoMessageChanged: "INFO_MES"
}

function registerReducer(state, action) {
    switch (action.type) {
        case actionTypes.nameChanged:
            return {...state, name: action.payload}
        case actionTypes.passwordChanged:
            return {...state, password: action.payload}
        case actionTypes.passwordConfirmationChanged:
            return {...state, passwordConfirm: action.payload}
        case actionTypes.infoMessageChanged:
            return {...state, message: action.payload}
        default:
            return {...state}
    }
}

function RegistrationPage(props) {
    const [state, dispatch] = useReducer(registerReducer, {
        name: "",
        password: "",
        passwordConfirm: "",
        message: ""
    })
    const navigate = useNavigate()

    return <div>
        <h2 style={{textAlign: "center"}}>Register</h2>
        <form className={styles.regForm}>
            <label>Name:
                <input type="text" value={state.name} onChange={(event) => {
                    dispatch({type: actionTypes.nameChanged, payload: event.target.value})
                }}/>
            </label>
            <label>Password:
                <input type="text" value={state.password} onChange={(event) => {
                    dispatch({type: actionTypes.passwordChanged, payload: event.target.value})
                }}/>
            </label>
            <label>Password confirm:
                <input type="text" value={state.passwordConfirm} onChange={(event) => {
                    dispatch({type: actionTypes.passwordConfirmationChanged, payload: event.target.value})
                }}/>
            </label>
            <input type="submit" onClick={(event) => {
                event.preventDefault()
                props.register(state.name, state.password, (res) => {
                    if (res === AuthResultTypes.success) {
                        navigate("/login")
                    } else {
                        dispatch({type: actionTypes.infoMessageChanged, payload: "error while register"})
                    }
                })
            }}/>
        </form>
        {state.message}
    </div>
}

export default connect(
    (state) => {
        return {
            authResult: state.authReducer.authResult
        }
    },
    (dispatch) => {
        return {register: (name, password, callback) => dispatch(register(name, password, callback))}
    }
)(RegistrationPage);