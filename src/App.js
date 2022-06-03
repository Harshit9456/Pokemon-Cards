import React from "react";
import "./App.css";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import PokemonList from "./containers/PokemonList";
import Pokemon from "./containers/Pokemon";
// import CartIcon from "./containers/CartIcon";
// import usePagination from "./component/Pagination";

function App() {
  return (
    <div className="App">
      <nav className=" nav navbar navbar sticky-top navbar-light ">
        <h1 className="heading">
          <img src="pokemon.png" alt="" />
        </h1>
        <NavLink to={"/pokemon/test"}>Search</NavLink>
      </nav>
      
      <Switch>
        <Route path={"/"} exact component={PokemonList} />
        <Route path={"/pokemon/:pokemon"} exact component={Pokemon} />
      </Switch>
    </div>
  );
}

export default App;
