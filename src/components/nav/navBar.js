import React from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import "./navBar.css"

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Init</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/inventories">Inventory</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/bin_locations">Bin Locations</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/pick_lists">Pick Lists</Link>
            </li>
            {
                (localStorage.getItem("init_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("init_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}