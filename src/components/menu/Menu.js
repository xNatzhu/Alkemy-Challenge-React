import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate} from "react-router-dom";
import Buscador from "../buscador/Buscador";
import "./css/Menu.css";

export default function Menu(props) {
    const { arrayFavorite } = props;
    const [token, setToken] = useState(sessionStorage.getItem("token"))
    const location = useLocation();
    const navigate = useNavigate();


    const signOff = ()=>{
        setToken(sessionStorage.clear());
        navigate("/")
    }

    return (
        <header>
            {location.pathname !== "/" && (
                <nav
                    className="navbar navbar-expand-lg container  bg-dark"
                    data-bs-theme="dark"
                >
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            xNatzhu
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span id="icon-menu-mobile" className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        activeClassName="active"
                                        to="/listado"
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        activeClassName="active"
                                        to="/favorito"
                                    >
                                        Favorito
                                    </NavLink>
                                </li>
                                <li>
                                    {arrayFavorite.length > 0 && (
                                        <div className="favorite-icon-count-nav">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                className="bi bi-heart-fill app-icon-fav"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                                />
                                            </svg>
                                            <p className="favorite-nav-count">{arrayFavorite.length}</p>
                                        </div>
                                    )}
                                </li>
                            </ul>
                            <button
                                        className="btn btn-primary-sign"
                                        activeClassName="active"
                                        to="/favorito"
                                        onClick={signOff}
                                    >
                                        Cerrar Seccion
                                    </button>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
}
