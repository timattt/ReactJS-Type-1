import {useReducer} from "react";
import styles from './../styles/RegistrationPage.module.scss'
import {connect} from "react-redux";
import {login} from "../store/actions/authActions";
import {useNavigate} from "react-router-dom";
import {AuthResultTypes} from "../store/constants";

const actionTypes = {
    nameChanged: "NAME_CHANGED",
    passwordChanged: "PASSWORD_CHANGED",
    infoMessageChanged: "INFO_MES"
}

function loginReducer(state, action) {
    switch (action.type) {
        case actionTypes.nameChanged:
            return {...state, name: action.payload}
        case actionTypes.passwordChanged:
            return {...state, password: action.payload}
        case actionTypes.infoMessageChanged:
            return {...state, message: action.payload}
        default:
            return {...state}
    }
}

function LoginPage(props) {
    const [state, dispatch] = useReducer(loginReducer, {
        name: "",
        password: "",
        passwordConfirm: "",
        message: ""
    })
    const navigate = useNavigate()

    return <div>
        <h2 style={{textAlign: "center"}}>Login</h2>
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
            <input type="submit" onClick={(event) => {
                event.preventDefault()
                props.login(state.name, state.password, (res) => {
                    if (res === AuthResultTypes.success) {
                        navigate("/articles")
                    } else {
                        dispatch({type: actionTypes.infoMessageChanged, payload: "error while login"})
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
        return {login: (name, password, callback) => dispatch(login(name, password, callback))}
    }
)(LoginPage);