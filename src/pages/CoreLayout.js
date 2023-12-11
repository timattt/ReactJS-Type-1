import {Link, Outlet, useNavigate} from "react-router-dom";
import styles from './../styles/CoreLayout.module.scss'
import {connect} from "react-redux";
import {unlogin} from "../store/actions/authActions";

function CoreLayout(props) {
    const navigate = useNavigate()
    return <div>
        <header style={{display: "flex", justifyContent: "center"}} className={styles.header}>
            <Link className={styles.headerItem} to="/">Home</Link>
            <Link className={styles.headerItem} to="/register">Register</Link>
            { !props.token ? <Link className={styles.headerItem} to="/login">Login</Link> : <div/> }
            { props.token ? <Link className={styles.headerItem} to="/articles">Articles</Link> : <div/> }
            { props.token ?
                        <button className={styles.headerItem} onClick={() => {
                            props.unlogin()
                            navigate('/')
                        }}>Unlogin</button>
                    : <div/>
            }

        </header>

        <Outlet/>

        <footer className={styles.footer}>Made by timattt</footer>
    </div>
}

export default connect(
    (state) => {
        return {
            token: state.authReducer.token
        }
    },
    (dispatch) => {
        return {unlogin: () => dispatch(unlogin())}
    }
)(CoreLayout);