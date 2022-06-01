import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/PokemonAction";
import _ from "lodash";

const Pokemon = (props) => {
  const pokemonName = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);
  
  React.useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);

  console.log(pokemonState);

  const ShowData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      return (
        <div className={"ui link cards"}>
          <div className="card">
            <div>
              <h1>Sprites</h1>
              <img src={pokeData.sprites.front_default} alt="" />
              <img src={pokeData.sprites.back_default} alt="" />
              <img src={pokeData.sprites.front_shiny} alt="" />
              <img src={pokeData.sprites.back_shiny} alt="" />
            </div>
          </div>
            <div className="card">
              <h1>Stats</h1>
              {pokeData.stats.map((e1) => {
                return (
                  <p>
                    {e1.stat.name} {e1.base_stat}
                  </p>
                );
              })}
            </div>
          <div className="card">
            <div >
            <h1>Abilities</h1>
            {pokeData.abilities.map((e1) => {
              return <p>{e1.ability.name}</p>;
            })}
            </div>
          </div>
        </div>
      );
    }

    if (pokemonState.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonState.errorMsg !== "") {
      return <p>{pokemonState.errorMsg}</p>;
    }

    return <p>error getting pokemon</p>;
  };

  // console.log("pokemonName", pokemonName)
  return (
    <div>
      <h1>{pokemonName}</h1>
      {ShowData()}
    </div>
  );
};

export default Pokemon;
