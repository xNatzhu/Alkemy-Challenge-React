import React,{ useEffect, useState} from "react";
import {useNavigate, Link, useParams}  from "react-router-dom"
import axios from "axios"
import swal from '@sweetalert/with-react'
import "./css/Detalle.css"

export default function Detalle(params) {
        //Variable
        const navigate = useNavigate();
        const [token, setToken] = useState(sessionStorage.getItem("token"))
        const {id} = useParams()
        const [movieId, setMovieId] = useState([])

   
        //token de autenticidad 

        function redirection(){
            if(!token){
                navigate("/")
            }

        }




        useEffect(()=>{
            redirection()
            console.log("token", token);
        },[token, id])


        //Consumo de api y verificacion de ID.

        useEffect(()=>{
            const url = "https://api.themoviedb.org/3/movie/"+id+"?api_key=9c248bca4eebe0191e41b369be0c2aa6&language=es-ES";
            console.log(url);
            axios.get(url) 
            .then( res => {
                console.log("Informacion", res.data);
                setMovieId(res.data)
                
            })
            .catch(error=>{
                swal({
                    icon:"warning",
                    title: "¡Ups! Hubo un error",
                    text:"Hubo un problema con el servidor, intentelo mas tarde.",
                  });
            })
        
        },[])
        

    return(
        <div className="container pt-5">
            { movieId.id !== parseInt(id)&& navigate("/error404")}
            {!token ? navigate("/") :
                <div>
                    {movieId.length === 0 ? (
                        <div className="app_listado_loading_container">
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="app-img-container-frontpage ">
                                <img className="app-img-fluid-frontpage"src={"https://image.tmdb.org/t/p/w500"+movieId.backdrop_path}/>

                            </div>

                        <div className="row container-main-detalle ">
                                <div className="col-12 col-md-3 flex-column app-detalle-poster-container">
                                    <img className="img-fluid app-detalle-poster"src={"https://image.tmdb.org/t/p/w500"+movieId.poster_path}/>
                                    <div>
                                        <ul className="app-detalle-genres-container">
                                            {movieId.genres.map((e, index)=>{
                                                
                                                return  <li className="app-detalle-genres" key={index}>{e.name}</li>
                                            })}
                                        </ul>

                                    </div>
                                </div>
                                <div className="col-12 col-md-9 app_detalle_context">
                                    <h6 className="app-detalle-original-title">{movieId.original_title}</h6>
                                    <h2 className="app-detalle-title">{movieId.title}</h2>
                                    <h5 className="mb-4">Fecha de estreno: {movieId.release_date}</h5>
                                    <div className="d-flex flex-row">
                                        <h6 className="mx-3">Votaciones: <span>{movieId.vote_average}</span></h6>
                                        <h6>Popularidad: <span>{movieId.popularity}</span></h6>
                                    </div>
                                    
                                    <p className="app-detalle-description mt-3">{movieId.overview}</p>
                                </div>

                        </div>
                        </div>
                    )}
                </div>
            }
        </div>

    );
}