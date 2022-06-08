import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, CarouselItem } from "react-bootstrap";
import { Imagestyle, Imagecomponent, Imagefighting, Imagebug, ImageNormal, MainImage, Namestyled, FontDiv, Button, Parastyle, Imagegif, AbilityName } from "./style";
import _ from "lodash";
import { GetPokemonList, GetPokemon } from "../actions/PokemonAction";
import { Row, Col } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import "../App.css";

const PokemonList = (props) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
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

  //  const fetchMoreData = () => {
  //   GetPokemonList()
  //  }

  const ShowData = () => {
    if (!_.isEmpty(pokemonList.detail)) {
      return (
        
             <InfiniteScroll
                  dataLength={pokemonList.detail.length}
                 next={pageIncreaseHandler}
                 hasMore={true}
                  loader={<h4>Loading...</h4>}
                >
                  <Row>
                    <div style={{ marginLeft : "5rem" }}>
                      <form >
                        <select className="btn btn-primary " onChange={(e) => {setType(e.target.value)}}>
                          <option  hidden > Filter </option>
                          <option  value="" > All </option>
                          <option value="fire" > Fire </option>
                          <option value="bug" > bug </option>
                          <option value="grass" > grass </option>
                          <option value="water" > Water </option>
                          <option value="normal" > Normal </option>
                        </select>
                      </form>
                    </div>
                     { pokemonList.detail && pokemonList.detail.length > 0 && pokemonList.detail.filter((d) => type !== "" ? d.types[0].type.name === type : d).map((e1) => {
            return (
              <>
              <Col className="card my-3 p-3 hover-shadow" style={{width: "18rem", margin: "2.25rem", borderRadius: "4%",backgroundColor: JSON.stringify(e1.types).includes('grass') ? 'rgb(199 229 159)' : JSON.stringify(e1.types).includes('poison') ? '#5CDB95' : JSON.stringify(e1.types).includes("flying") ? 'rgb(129, 186, 243)': JSON.stringify(e1.types).includes('fire') ? '#379683': JSON.stringify(e1.types).includes('water') ? 'rgb(70, 134, 148)': JSON.stringify(e1.types).includes('ground') ? '#ae8b6f' : JSON.stringify(e1.types).includes('bug') ? "#01903a" : JSON.stringify("fighting") ? "rgb(240, 193, 105)" : "pink", /*borderWidth: "10px", borderColor: "rgb(225 228 232)"*/ boxShadow: "100px black" }} xs={12} sm={12} md={4} lg={4} xl={3}>
                <FontDiv>  
                <div  style={{ marginLeft: "12rem" }}>
                  {e1.types[0].type.name.includes('fire') ? 
                  <Imagestyle src="fire.png" alt="fire" /> : e1.types[0].type.name.includes('grass') ? 
                  <Imagestyle  src="grass.png" /> :e1.types[0].type.name.includes('water') ? 
                  <Imagestyle  src="water.png" /> : e1.types[0].type.name.includes('ground') ? 
                  <Imagestyle src="ground.png" /> : e1.types[0].type.name.includes('fighting') ? 
                  <Imagefighting src="fighting.png"  /> : e1.types[0].type.name.includes('bug') ? 
                  <Imagebug src="bug.png" /> : e1.types[0].type.name.includes('normal') ?
                    <ImageNormal src="normal.png"  /> : e1.types[0].type.name.includes('flying') ? 
                  <img src="flying.png" /> : e1.types[0].type.name.includes('poison') ? 
                  <Imagestyle src="poison.png" /> : e1.types[0].type.name.includes('electric') ? 
                  <Imagecomponent src="electric.png" /> : e1.types[0].type.name.includes('fairy') ? 
                  <Imagecomponent src="fairy.png" /> : e1.types[0].type.name.includes('rock') ? 
                  <Imagecomponent src="rock.png" /> : e1.types[0].type.name.includes('ghost') ? 
                  <Imagecomponent src="ghost.png" /> : e1.types[0].type.name.includes('psychic') ? 
                  <Imagecomponent src="psychic.png" /> : <img src="" />}
                </div>
                  <Namestyled  ><b>{e1.name.toUpperCase(0)}</b></Namestyled> 
                  <Carousel className="carousel-fade" data-bs-ride = {true}>
                    <Carousel.Item>
                    <MainImage className="card-img-top bgclr"  src={e1.sprites.front_default} alt="Card image cap" />
                    </Carousel.Item>
                    <Carousel.Item>
                    <MainImage className="card-img-top bgclr" src={e1.sprites.back_default} alt="Card image cap" />
                    </Carousel.Item>
                    <Carousel.Item>
                    <MainImage className="card-img-top bgclr " src={e1.sprites.front_shiny} alt="Card image cap" />
                    </Carousel.Item>
                    <Carousel.Item>
                    <MainImage className="card-img-top bgclr" src={e1.sprites.back_shiny} alt="Card image cap" />
                    </Carousel.Item>
                  </Carousel>
                  <p style={{ marginRight: "1rem" }} >height: {e1.height}</p><p style={{ marginLeft: "9rem", marginTop: "-1.5rem" }}> weight: {e1.weight} </p> 
                  <hr style={{color: "black", height: "0.2vh"}} ></hr>
                  <p><b>Species:</b> {e1.species.name}</p>
                   <p><b>Stats:</b></p>
                  {e1.stats.map((s) => {
                    return(
                      <li>{s.stat.name.toUpperCase(1)}</li>
                    )
                  })}
                  </FontDiv>
                  <Parastyle ><b>Abilities:</b></Parastyle>
                  {e1.abilities.map((a) => {
                      return (
                        <AbilityName>{a.ability.name}</AbilityName>
                      )
                    })}
              </Col>
              </>
            )
                  })}
                  </Row>
                   </InfiniteScroll>
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
              onClick={() => props.history.push(`/${search}`)}
            >
              Search
            </button>
          </div>
          <Button
           className="btn btn-primary" onClick={() => props.history.push(`/pokemonTable`)}
           >
             <Imagegif src="change.gif" alt="load" />
             Pokemon Table
          </Button>
        </div>
        {ShowData()}
      </div>
      {/* <div className="pagination">
        <button onClick={() => pageDecreaseHandler()}>prev</button>
        <div>{active}</div>
        <button onClick={() => pageIncreaseHandler()}>next</button>
      </div> */}
      </div>
    </>
  );
};

export default PokemonList;
