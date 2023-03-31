import React from "react";
import swal from '@sweetalert/with-react'
import "./css/Buscador.css"
import {useNavigate}  from "react-router-dom"

export default function Buscador(props) {
    const navigate = useNavigate();
    const {arrayFavorite} = props;
    const submitHandler = (e)=>{
        e.preventDefault()
        const keyword = e.currentTarget.keyword.value.trim()
        console.log(keyword);
        if(keyword.length < 3){
            swal({
                icon:"error",
                title: "¡Ups! Error",
                text:"No puede añadir elementos vacios.",
              });
        }
        else{
            e.currentTarget.keyword.value = ""
            navigate("/resultados/"+keyword)
        }
    }
    console.log("buscador", arrayFavorite);
    return(
            <form class="d-flex form-search" onSubmit={submitHandler} role="search">
                <input class="form-control me-2" type="search" name="keyword" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
             </form>
    );
}