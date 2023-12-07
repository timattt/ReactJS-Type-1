import {Link} from "react-router-dom";

export function HomePage() {
    return <div>
        <h1 style={{textAlign: "center"}}>Home page</h1>
        <Link to="/articles"/>
    </div>
}