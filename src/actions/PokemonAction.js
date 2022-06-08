import axios from "axios";

export const GetPokemonList = (page) => async dispatch => {
    try {
       dispatch({
         type: "POKEMON_LIST_LOADING" 
       }) 

       const PageLimit = 36;
       let pageNo = 1;
       const queryParam = "?page=" + pageNo + "&limit=" + PageLimit
    //    const offset = (page * PageLimit) - PageLimit

       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon` + queryParam)
       dispatch({
           type: "POKEMON_LIST_SUCCESS",
           payload: response.data,
           
       })
     return (response.data)  
    }  catch (e) {
       dispatch({
           type: "POKEMON_LIST_FAIL",
       })
    }
};

export const GetPokemon = (pokemon) => async dispatch => {
    try {
        dispatch({
          type: "POKEMON_LIST_LOADING" 
        }) 
        const response = await axios.get(pokemon.url);
        dispatch({
            type: "POKEMON_DETAIL_SUCCESS",
            payload: response.data,
            pokemonName: pokemon,
            // url: pokemonData
        })
     }  catch (e) {
        dispatch({
            type: "POKEMON_MULTIPLE_FAIL",
        })
     }
}