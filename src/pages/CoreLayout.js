import {Link, Outlet} from "react-router-dom";
import styles from './../styles/CoreLayout.module.scss'

export function CoreLayout() {
    return <div>
        <header className={styles.header}>
            <Link className={styles.headerItem} to="/">Home</Link>
            <Link className={styles.headerItem} to="/articles">Articles</Link>
        </header>

        <Outlet/>

        <footer className={styles.footer}>Made by timattt</footer>
    </div>
}