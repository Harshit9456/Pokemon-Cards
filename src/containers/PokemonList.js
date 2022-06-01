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
              <Col className="card my-3 p-3 rounded shadow mb-5 bg-white" style={{width: "18rem", margin: "2.25rem"}} xs={12} sm={12} md={4} lg={4} xl={3}>
                <div>
                  <div>
                    <img style={{ marginBottom: "-4rem", marginLeft: "5.25rem", borderRadius: "500%" }} src={e1.sprites.front_shiny} />
                  </div>
                  {e1.types.map((t) => {
                    return (
                      <p style={{ textAlign: "right", marginRight: "1rem" }}>{t.type.name}</p>
                    )
                  })}
                  <h1 style={{ fontSize: "15px" }} ><b>{e1.name.toUpperCase(0)}</b></h1> 
                  <img className="card-img-top" style={{ padding: "0px 0px 0px 0px", width: "250px", height: "150px", backgroundColor: "#101778" }} src={e1.sprites.front_default} alt="Card image cap" />
                  <p style={{ textAlign: "center" }} >height: {e1.height} || weight: {e1.weight} </p> 
                  <p><b>{e1.species.name}</b></p>
                  {e1.stats.map((s) => {
                    return(
                      <p>{s.stat.name.toUpperCase(1)}</p>
                    )
                  })}
                  </div>
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
    <div className="background" style={{  backgroundImage: `url(${process.env.PUBLIC_URL + '/Ash.webp'})`, backgroundPosition: "sticky"  }} >
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
