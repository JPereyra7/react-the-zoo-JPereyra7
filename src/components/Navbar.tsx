import { NavLink } from "react-router-dom"
import "../styles/Navbar.css"

export const Navbar = () => {
    return(
        <>
            
        <nav>
                <div className="navbarContainer">
            <img 
            src="/src/assets/zoo.png" alt=""
            className="loggan" />
            <ul className="liFlexed">
                <li>
                    <NavLink to={"/"}>Hem</NavLink>
                </li>
                <li>
                    <NavLink to={"/djuren"}>Djuren</NavLink>
                </li>
            </ul>
                </div>
        </nav>
        </>
    )
}