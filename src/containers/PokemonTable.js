import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Carousel, CarouselItem } from "react-bootstrap";
import _ from "lodash";
import { Button, Imagegif } from "./style";
import { GetPokemonList, GetPokemon } from "../actions/PokemonAction";
import { Link } from "react-router-dom";
// import { usePagination } from "../UsePagination";
import ReactPaginate from "react-paginate";

const PokemonTable = (props) => {
    const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [num, setNum] = useState();
  const pokemonList = useSelector((state) => state.PokemonList);
  const count = useSelector((state) => state.PokemonList);
  const pokemonName = props.match.params.pokemon;
  const pokemonState = useSelector((state) => state.Pokemon);

  console.log(pokemonList)

  useEffect(() => {
  }, [count]);

  useEffect(() => {
    if (pokemonList && pokemonList.data && pokemonList.data.length !== 0) {
      pokemonList.data.map((e2) => {
        dispatch(GetPokemon(e2));
      });
    }
  }, [pokemonList.data]);

  React.useEffect(() => {
    FetchData(active);
  }, [active]);

  useEffect(() => {
    PokemonData();
  }, []);

  const FetchData = (active) => {
    dispatch(GetPokemonList(active));
  };

  const PokemonData = () => {
    for (let url in pokemonList.data) {
      console.log(url);
    }
  };

  // const pageDecreaseHandler = () => {
  //   console.log(active);
  //   if (active === 1) {
  //   } else {
  //     setActive(active - 1);
  //   }
  //   console.log(active);
  // };
  const pageIncreaseHandler = () => {
    console.log(active);
    console.log(totalPages);
    GetPokemonList()
    if (active === totalPages) {
    } else {
      setActive(active + 1);
    }
    console.log(active);
    console.log(count);
  };

  useEffect(() => {
    if (count % 15 !== 0) {
      const pages = Math.floor(pokemonList.count / 15 + 1);
      setTotalPages(pages);
    } else {
      const pages = Math.floor(pokemonList.count / 15);
      setTotalPages(pages);
    }
  }, [pokemonList.count]);

  useEffect(() => {
    if (active < totalPages) {
      setNum(15);
    }
    if (active === totalPages && count % 15 === 0) {
      setNum(15);
    }
    if (active === totalPages && count % 15 !== 0) {
      setNum(count % 15);
    }
  }, [active, totalPages, count]);

    const ShowData = () => {
        if (pokemonList.loading) {
            return <p>Loading...</p>
        }
        console.log(pokemonList)

        if (!_.isEmpty(pokemonList.detail)) {
            // const pokeData = pokemonList.data[pokemonName];
                return (
                    <div className={"list-wrapper"}>
                      {pokemonList.detail.map(e1 => {
                          return(
                              <div className="pokemon-item">
                                  <p>{e1.name.toUpperCase(0)}</p>
                                  {e1.types[0].type.name}
                                  {/* <img src={pokeData.sprites.front_default} alt=""/> */}
                                  {/* <Link to={`/pokemon/${e1.name}`}>view</Link> */}
                              </div>
                          )
                      })}
                    </div>
                ) 
            }

        if (pokemonList.errorMsg !== "") {
            return <p>{pokemonList.errorMsg}</p>
        }

        return <p>unable to get data</p>
    };
    
    return (
        <div>
            <div className={"search-wrapper"}>
                <p>Search: </p>
                <input type="text" onChange={(e) => setSearch(e.target.value)}/>
                <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
                <Button className="btn btn-primary" onClick={() => props.history.push(`/`)}><Imagegif src="change.gif" /> Pokemon Cards</Button> 
            </div>
            <div>
            <h6  style={{ marginLeft: "8rem" }}>Name</h6> 
            <h6 style={{marginLeft: "105rem", marginTop: "-1.5rem"}}>Types</h6>
            </div>
            
          {ShowData()}
          {!_.isEmpty(pokemonList.data) && (
             <ReactPaginate 
               pageCount={(pokemonList.count / 15)}
               pageRangeDisplayed={0}
               marginPagesDisplayed={1}
               onPageChange={(data) => FetchData(data.selected + 1)}
               containerClassName={"pagination"}
             />
          )}
        </div>
      
    )
};

export default PokemonTable;