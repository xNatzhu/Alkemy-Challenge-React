import React, { useEffect, useState } from "react";
import {useNavigate, Link, useParams}  from "react-router-dom"
import axios from "axios"
import swal from '@sweetalert/with-react'

export default function Resultados(props){
    const {keyword} = useParams()
    const [movieResults, setMovieResults] = useState([]);
    const navigate = useNavigate();
    const [token, setToken] = useState(sessionStorage.getItem("token"))
    const [search, setSearch] = useState(true)
    const {arrayFavorite} = props;

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


    useEffect(()=>{
        const url = "https://api.themoviedb.org/3/search/movie?api_key=9c248bca4eebe0191e41b369be0c2aa6&language=es-ES&query="+keyword;
        console.log(url);
        axios.get(url) 
        .then( res => {
            console.log("Informacion", res.data.results);
            const movieArray = res.data.results
            if(movieArray.length === 0){
                swal({
                    icon:"error",
                    title: "¡Ups! Hubo un error",
                    text:"La busqueda proporcionada no hay resultado.",
                  });
                setSearch(false)
                  
            }
            setMovieResults(movieArray)
            
        })
        .catch(error=>{
            swal({
                icon:"warning",
                title: "¡Ups! Hubo un error",
                text:"Hubo un problema con el servidor, intentelo mas tarde.",
              });
        })
    },[keyword])
    return(
        <div className="container">
                <div className="mt-5 mb-5">
                    <h3 className="app_listado_section_title mt-3 mb-5">Resultado de busqueda: <span>{keyword}</span></h3>
                </div>
            {!token?navigate("/"):
            <div className="row card-conteiner-main">
                {movieResults.length === 0
                
                ? <div className="alert alert-light" role="alert">
                    No se encontraron elementos en la busqueda.
                </div>

                :   
               
                <>
                    <div>
                        <h3 className="app_listado_section_title mt-3 mb-5">Resultado de busqueda: <span>{keyword}</span></h3>
                    </div>
                    {movieResults.map((movie, index)=>{

                         const isFavorite = arrayFavorite.some(favorite => parseInt(favorite.id) === parseInt(movie.id));
                        return(

                                <div className="col d-flex justify-content-center mt-3 mb-3">
                                <div className="card" key={index} style={{width: "18rem"}}>
                                    <div className="card-img-container">
                                        <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} className="card-img-top" alt="..."/>
                                    </div>
                                    {isFavorite
                                        ? (<button onClick={props.favorite} data-movie={movie.id} data-overview={movie.overview} className="favourite-btn">

                                            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-heart-fill app-icon-fav-check" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                            </svg>
                                        </button>)
                                        : (
                                        <button onClick={props.favorite} data-movie={movie.id} data-overview={movie.overview} className="favourite-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-heart app-icon-fav" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                        </svg>
                                        </button>)
                                    }
                                    
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-center">{movie.title}</h5>
                                        
                                        <div className="mt-auto align-self-end app-card-container-button">
                                        <div>
                                            <div className="d-flex flex-row mt-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-star app-card-star" viewBox="0 0 16 16">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                                </svg>
                                                
                                                <p className="app-card-star-text" id="voteAverage">{movie.vote_average}</p>
                                            </div>
                                        </div>
                                            <Link to={"/detalle/" + movie.id } className="btn btn-primary-card mt-3">Ver mas</Link>
                                        </div>
                                        
                                    </div>
                                </div> 
                                </div>
                               
                        )
                    })}


                  </>
                    }
            </div>
            }      
        </div> 
    );
}