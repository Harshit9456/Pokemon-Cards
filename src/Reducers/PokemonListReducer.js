const DefaultState = {
  loading: false,
  data: [],
  errorMsg: "",
  count: 0,
  detail: []
};

const PokemonListReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case "POKEMON_LIST_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "POKEMON_LIST_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "unable to get pokemon",
      };
    case "POKEMON_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload.results,
        errorMsg: "",
        count: action.payload.count,
      };
    case "POKEMON_DETAIL_SUCCESS":
      return {
        ...state,
        loading: false,
        data: setPokemonData(action.payload, state),
        errorMsg: "",
        count: action.payload.count,
      };
    default:
      return state;
  }
};

const setPokemonData = (pokemonData, state) => {
   
  var pokemonDetail = state.detail;
     
     pokemonDetail.push(pokemonData)

    return pokemonDetail;
  }

// const GetPokemonData = async () => {
//   let pokemonArray = [];
//   for( let i = 1; i <= 151; i++ ) {
//     pokemonArray.push(await GetPokemon(i))
//   }
//   setPokemonData(pokemonArray)
// }

export default PokemonListReducer;
