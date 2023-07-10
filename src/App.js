
import "./App.css"
import Login from './components/login/Login';
import Listado from './components/listado/Listado';
import Detalle  from './components/detalle/Detalle';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Menu from "./components/menu/Menu";
import Resultados from "./components/resultados/Resultados";
import { useState, useEffect } from "react";
import Favorito from "./components/favorito/Favorito";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Error404 from "./components/error404/Error404";
function App() {

  const [favoriteInf, setFavoriteInf] = useState(localStorage.getItem("fav"));
  const [arrayFavorite, setArrayFavorite] = useState([]);
  useEffect(() => {
    if (favoriteInf) {
      try {
        setArrayFavorite(JSON.parse(favoriteInf));
      } catch (error) {
        console.log("Error al analizar JSON en localStorage", error);
      }
    }
  }, [setFavoriteInf]);

  
  const addOrRemoveFavorite = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgLink = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const vote_average = parent.querySelector("#voteAverage").innerText
    
  
    const favoriteObj = {
      title,
      imgLink,
      vote_average,
      overview: btn.dataset.overview,
      id: btn.dataset.movie
    };
  
    const movieIsInArray = arrayFavorite.some((oneMovie) => {
      return oneMovie.id === favoriteObj.id;
    });
  
    let newFavorites;
    if (!movieIsInArray) {
      newFavorites = [...arrayFavorite, favoriteObj];
      console.log("Se agregó una nueva película", newFavorites);
      btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart-fill app-icon-fav-check" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>`

    } else {
      newFavorites = arrayFavorite.filter((oneMovie, index) => {

          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart app-icon-fav" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>`
        

        return oneMovie.id !== favoriteObj.id;
        
      });

      console.log("Se eliminó una película", newFavorites);
    }
    
    localStorage.setItem("fav", JSON.stringify(newFavorites));
    setArrayFavorite(newFavorites);
    
  };
  

  return (
      <BrowserRouter>
        <Menu arrayFavorite={arrayFavorite}/>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/listado" element={<Listado  favorite={addOrRemoveFavorite} arrayFavorite={arrayFavorite}/>}></Route>
          <Route path="/detalle/:id" element={<Detalle  favorite={addOrRemoveFavorite} />}></Route>
          <Route path="/resultados/:keyword" element={<Resultados favorite={addOrRemoveFavorite} arrayFavorite={arrayFavorite}/>}></Route>
          <Route path="/favorito" element={<Favorito arrayFavorite={arrayFavorite} setArrayFavorite={setArrayFavorite}/>}></Route>
          <Route path="*" element={<Error404/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}
export default App;






