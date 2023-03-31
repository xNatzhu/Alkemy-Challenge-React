import React,{useEffect, useState} from "react";
import axios from "axios"
import swal from '@sweetalert/with-react'
import {useNavigate, redirect}  from "react-router-dom"

//Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Login.css"

export default function Login(){
    //variables  

    const [token, setToken] = useState(sessionStorage.getItem("token"))

    //Navegacion
    const navigate = useNavigate();

    const submitHandler = (e)=>{
        e.preventDefault();
    // Valores asignados en el input
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Expresiones regulares
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\[\]\\.,;:\s@\"]+\.)+[^<>()\[\]\\.,;:\s@\"]{2,})$/;
    const isValidEmail = emailRegex.test(email);

    // Datos de usuarios
    const validUser = { email: "challenge@alkemy.org", password: "react" };

    // Validaciones
    if (email.trim() === "" || password.trim() === "") {
          swal({
            icon:"error",
            title: "¡Ups! Error",
            text:"No se permiten campos vacíos. Por favor, completa la información requerida.",
          });
        
        return;
    }

    if (!isValidEmail) {
          swal({
            icon:"error",
            title: "¡Ups! Error",
            text:"El correo electrónico que ingresaste no es válido. Por favor, verifica la información y vuelve a intentarlo.",
          });
        
        return;
    }

    if (validUser.email !== email || validUser.password !== password) {
        swal({
            icon:"error",
            title: "¡Ups! Error",
            text:"El correo electrónico o la contraseña que ingresaste son incorrectos. Por favor, verifica la información y vuelve a intentarlo.",
          });
        return;
    }

    //envio de informacion
    axios.post("http://challenge-react.alkemy.org",{email, password}) // post: envio de info (api | objeto de datos)
        .then( res => {
            console.log("Informacion", res);

            //Valor del token del usuario / identificador

            const token = res.data.token;
            //Informacion almacenada en el navegador
            sessionStorage.setItem("token",token);
            //Una vez que la ejecucion sea correcta - redirrecionara dentro del navigate
            navigate("/listado");
        })
    }


    function redirection(){
        if(token){
            navigate("/listado")
        }
    }

    useEffect(()=>{
        redirection()
    },[token])

    console.log(token);
    return(
        <>  
            {token ? navigate("/listado"):
            <div className="app_container_form">
            <form className="app_form" onSubmit={submitHandler}>
            <h2 className="text-center mb-5"> Alkemy <span>Challenge</span> React</h2>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" id="form_email" />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="form_password"/>
            </div>
            <div className="app_form_container_button">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </form>
        </div>               
        }


        </>
        
    );
};