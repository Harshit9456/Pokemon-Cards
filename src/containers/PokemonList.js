import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { GetPokemonList, GetPokemon } from "../actions/PokemonAction";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";
// import UsePagination from "../component/Pagination";

const PokemonList = (props) => {
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
    // console.log(count);
  }, [count]);

  useEffect(() => {
    if (pokemonList && pokemonList.data && pokemonList.data.length !== 0) {
      pokemonList.data.map((e2) => {
        dispatch(GetPokemon(e2));
      });
    }
  }, [pokemonList.data]);

  React.useEffect(() => {
    // dispatch(GetPokemon(pokemonName));
    FetchData(active);
  }, [active]);

  useEffect(() => {
    PokemonData();
  }, []);

  const FetchData = (active) => {
    dispatch(GetPokemonList(active));
    // const pokemonData =
  };

  const PokemonData = () => {
    for (let url in pokemonList.data) {
      console.log(url);
    }
  };

  const pageDecreaseHandler = () => {
    console.log(active);
    if (active === 1) {
    } else {
      setActive(active - 1);
    }
    console.log(active);
  };
  const pageIncreaseHandler = () => {
    console.log(active);
    console.log(totalPages);
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

  // const ShowData = () => {
  // if (!_.isEmpty(pokemonState.data[pokemonName])) {
  //   const pokeData = pokemonState.data[pokemonName];
  //   return (
  //     <div className={"ui link cards"}>
  //       <div className="card">
  //         <div>
  //           <h1>Sprites</h1>
  //           <img src={pokeData.sprites.front_default} alt="" />
  //           <img src={pokeData.sprites.back_default} alt="" />
  //           <img src={pokeData.sprites.front_shiny} alt="" />
  //           <img src={pokeData.sprites.back_shiny} alt="" />
  //         </div>
  //       </div>
  //       </div>
  //   );
  // }

  const ShowData = () => {
    if (!_.isEmpty(pokemonList.detail)) {
      // const pokeData = pokemonList.detail[pokemonName];
      return (
        <Row>
          {pokemonList.detail.map((e1) => (
              <Col className="card my-3 p-3 shadow " style={{width: "18rem", margin: "2.25rem", borderRadius: "2%", backgroundColor: "pink" }} xs={12} sm={12} md={4} lg={4} xl={3}>
                <div>
                  {e1.types.map((t) => {
                    if( t.type.name === "fire" ) {
                      return (
                      <p style={{ textAlign: "right", marginRight: "1rem" }}><img style={{ width: "10%" }} src="fire.png" alt="" />{t.type.name}</p>
                    )};
                    if(t.type.name== "grass") {
                      return (
                        <p style={{ textAlign: "right", marginRight: "1rem" }}><img style={{ width: "10%" }} src="grass.png" alt="" />{t.type.name}</p>
                      )
                    }
                    if(t.type.name ==="flying") {
                      return(
                        <p style={{ textAlign: "right", marginRight: "1rem" }}><img style={{ width: "10%" }} src="flying.png" alt="" />{t.type.name}</p>
                      )
                    }
                    if(t.type.name ==="poison") {
                      return(
                        <p style={{ textAlign: "right", marginRight: "1rem" }}><img style={{ width: "12%" }} src="poisionn.png" alt="" />{t.type.name}</p>
                      )
                    }
                    if(t.type.name ==="water") {
                      return(
                        <p style={{ textAlign: "right", marginRight: "1rem" }}><img style={{ width: "10%" }} src="water.png" alt="" />{t.type.name}</p>
                      )
                    }
                    if(t.type.name ==="bug") {
                      return(
                        <p style={{ textAlign: "right", marginRight: "1rem" }}><img style={{ width: "10%" }} src="bug.png" alt="" />{t.type.name}</p>
                      )
                    }
                    if(t.type.name ==="electric") {
                      return(
                        <p style={{ textAlign: "right", marginRight: "1rem" }}><img style={{ width: "10%" }} src="electric.png" alt="" />{t.type.name}</p>
                      )
                    }
                    if(t.type.name ==="normal") {
                      return(
                        <p style={{ textAlign: "right", marginRight: "1rem" }}>{t.type.name}</p>
                      )
                    }
                    if(t.type.name ==="ground") {
                      return(
                        <p style={{ textAlign: "right", marginRight: "1rem" }}><img style={{ width: "10%" }} src="ground.jpeg" alt="" />{t.type.name}</p>
                      )
                    }
                    if(t.type.name ==="fairy") {
                      return(
                        <p style={{ textAlign: "right", marginRight: "1rem" }}><img style={{ width: "10%" }} src="fairy.png" alt="" />{t.type.name}</p>
                      )
                    }
                    if(t.type.name ==="fighting") {
                      return(
                        <p style={{ textAlign: "right", marginRight: "1rem" }}><img style={{ width: "15%" }} src="fighting.png" alt="" />{t.type.name}</p>
                      )
                    }
                    if(t.type.name ==="psychic") {
                      return(
                        <p style={{ textAlign: "right", marginRight: "1rem" }}><img style={{ width: "15%" }} src="psychic.png" alt="" />{t.type.name}</p>
                      )
                    }
                  })}
                  <h1 style={{ fontSize: "15px" }} ><b>{e1.name.toUpperCase(0)}</b></h1> 
                  <img className="card-img-top" style={{ padding: "0px 0px 0px 0px", width: "250px", height: "150px", backgroundColor: "#ffe600", borderRadius: "2%" }} src={e1.sprites.front_default} alt="Card image cap" />
                  <p style={{ marginRight: "1rem" }} >height: {e1.height}  </p><p style={{ marginLeft: "10.25rem", marginTop: "-1.5rem" }}> weight: {e1.weight} </p> 
                  <p><b>Species:</b> {e1.species.name}</p>
                   <p><b>Stats:</b></p>
                  {e1.stats.map((s) => {
                    return(
                      <li>{s.stat.name.toUpperCase(1)}</li>
                    )
                  })}
                  </div>
                  <p style={{ textAlign: "right", marginRight: "7rem", marginBottom: "-2rem" }}><b>Abilities:</b></p>
                  {e1.abilities.map((a) => {
                      return (
                        <p style={{ textAlign: "right", marginBottom: "-0.5rem" }}>{a.ability.name}</p>
                      )
                    })}
              </Col>
           
          ))}
        </Row>
      );
    }

    if (pokemonList.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>;
    }

    return <p>unable to get data</p>;
  };

  return (
    <>
    <div className="background" >
      <div>
        <div className={"search-wrapper"}>
          <input
            className="input-search"
            placeholder="Search Pokemon..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            <button
              className="example-button fa fa-search"
              onClick={() => props.history.push(`/pokemon/${search}`)}
            >
              Search
            </button>
          </div>
        </div>
        {ShowData()}
      </div>
      <div className="pagination">
        <button onClick={() => pageDecreaseHandler()}>prev</button>
        <div>{active}</div>
        <button onClick={() => pageIncreaseHandler()}>next</button>
      </div>
      </div>
    </>
  );
};

export default PokemonList;
