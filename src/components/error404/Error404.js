import React,{ useEffect, useState} from "react";
import "./css/Error404.css"

export default function Error404(params) {
    return(
        <div className="container">
            <div className="container-error-404">
                <h2 className="app-title-error-404">ERROR <span>404</span></h2>
                <div className="alert alert-light" role="alert">
                    La pagina que intenta acceder no existe.
                  </div>
            </div>

        </div>
        
        
    );
}