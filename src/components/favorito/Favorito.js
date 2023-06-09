import React, { useEffect,useState} from "react";
import {useNavigate, redirect, Link}  from "react-router-dom"

export default function Favorito(props) {
    const {arrayFavorite, setArrayFavorite} = props;

    const [token, setToken] = useState(sessionStorage.getItem("token"))
    const navigate = useNavigate();
    //token de autenticidad 

    function redirection(){
        if(!token){
            navigate("/")
        }
    }

    useEffect(()=>{
        redirection()
        console.log("token", token);
    },[token])

    const removeFavorite = (movieFavorite)=>{
        const newFavorites = arrayFavorite.filter((oneMovie, index) => {          
            return oneMovie.id !== movieFavorite.id;
          });
          localStorage.setItem("fav", JSON.stringify(newFavorites));
          setArrayFavorite(newFavorites); // Agrega esta línea para actualizar el estado
    }

    return(
        <div className="container">
            <div className="mt-5 mb-5">
                <h3 className="app_listado_section_title mt-3 mb-5">Lista <span>de</span> favoritos</h3>
            </div>
            <div>
                {arrayFavorite.length === 0 ? (
                    <div className="alert alert-light" role="alert">
                    No se encontraron elementos en favoritos.
                  </div>
                ):(
                    <>
                    <div className="row card-conteiner-main">
                    {arrayFavorite.map((movieFavorite, index)=>{
                        
                        return(
                            <div className="col d-flex justify-content-center mt-3 mb-3">
                                <div className="card" key={index} style={{width: "18rem"}}>
                                    <div className="card-img-container">
                                        <img src={movieFavorite.imgLink} className="card-img-top" alt="..."/>
                                    </div>
                                    <button onClick={() => removeFavorite(movieFavorite)} data-movie={movieFavorite.id} data-overview={movieFavorite.overview} className="favourite-btn">

                                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-heart-fill app-icon-fav-check" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                    </svg>
                                    </button>

                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-center">{movieFavorite.title}</h5>
                                        
                                        <div className="mt-auto align-self-end app-card-container-button">
                                        <div>
                                            <div className="d-flex flex-row mt-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-star app-card-star" viewBox="0 0 16 16">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                                </svg>
                                                <p className="app-card-star-text" id="voteAverage">{movieFavorite.vote_average}</p>
                                            </div>
                                        </div>
                                            <Link to={"/detalle/" + movieFavorite.id} className="btn btn-primary-card mt-3">Ver mas</Link>
                                        </div>
                                        
                                    </div>
                                </div> 
                                </div>
    
                        )
                    })}
                    </div>


                    </>
                )}
    
            </div>

        </div>
    );
}