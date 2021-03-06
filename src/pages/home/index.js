import "./styles.css";
import Logo from "../../assets/logo.png";
import Remove from "../../assets/remove.png";
import Empty from "../../assets/empty.png";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavorites,
  setFavorite,
  removeFavorite,
} from "../../store/modules/favorites/actions";

const Home = () => {
  const dispatch = useDispatch();

  const { characters } = useSelector((state) => state.favorites);

  const [selectedCharacter, setSelectedCharacter] = useState({
    name: "",
    gender: "",
    species: "",
    location: {
      name: "",
    },
    status: "",
    image: "",
  });

  useEffect(() => {
    getLocalfavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLocalfavorites = () => {
    dispatch(getFavorites());
  };

  const searchCharacter = async (event) => {
    event.preventDefault();
    const input = document.querySelector("input");

    try {
      await axios
        .get(`https://rickandmortyapi.com/api/character/?name=${input?.value}`)
        .then((response) => {
          setSelectedCharacter(response?.data?.results[0]);
          input.value = response.data.results[0].name.toString();
        });
    } catch (error) {
      console.log(error);
    }

    const index = characters?.findIndex(
      (character) => character.name === selectedCharacter.name
    );
    if (!index < 0) {
      const button = document.querySelector(".add-button");
      button.textContent = "Add to Favorites";
    }
  };

  const searchRandomCharacter = async () => {
    const random = Math.round(Math.random() * 670 + 1);
    const input = document.querySelector("input");

    try {
      await axios
        .get(`https://rickandmortyapi.com/api/character/${random}`)
        .then((response) => {
          setSelectedCharacter(response?.data);
          input.value = response.data.name.toString();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const appear = () => {
    const favorites = document.querySelector(".favorites-container");
    favorites.style = "animation-name: appear";
  };

  const disappear = () => {
    const favorites = document.querySelector(".favorites-container");
    favorites.style = "animation-name: disappear";
  };

  const addToFavorites = () => {
    dispatch(setFavorite(selectedCharacter));
  };

  const removeFromFavorites = async (character) => {
    const card = document.getElementById(character.id);

    card.animate([{ transform: "scale(1)" }, { transform: "scale(0)" }], {
      duration: 500,
      easing: "ease-in-out",
    });

    await new Promise((resolved) => setTimeout(resolved, 400));

    dispatch(removeFavorite(character));
  };

  return (
    <div className="home">
      <img src={Logo} alt="Rick and Morty" />
      <div className="parent-favorites">
        <div className="favorites-container">
          <div className="favorites-header" onClick={disappear}>
            <h3 className="title">Favorites</h3>
          </div>
          <div className="favorites-list">
            {characters?.length ? (
              characters?.map((character) => {
                return (
                  <div
                    key={character.id}
                    className="favorites-card"
                    id={character.id}
                  >
                    <img
                      src={character.image}
                      className="favorites-image"
                      onClick={() => {
                        setSelectedCharacter(character);
                        disappear();
                      }}
                      alt="Character"
                    />

                    <div
                      className="info-list"
                      onClick={() => {
                        setSelectedCharacter(character);
                        disappear();
                      }}
                    >
                      <h4>{character.name}</h4>
                    </div>
                    <img
                      src={Remove}
                      className="remove"
                      onClick={() => {
                        removeFromFavorites(character);
                      }}
                      alt="remove"
                    />
                  </div>
                );
              })
            ) : (
              <div className="no-favorites">
                <img src={Empty} alt="no favorites" />
                <h4>You have no favorites. Why are you here?</h4>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="search">
        <div className="display">
          <div className="img-border">
            {selectedCharacter.image !== "" ? (
              <div className="img-display">
                <img src={selectedCharacter.image} alt="Loading" />
              </div>
            ) : (
              <div className="img-display">
                <img
                  src="https://media.giphy.com/media/i2tLw5ZyikSFdkeGHT/giphy.gif"
                  alt="Loading"
                />
              </div>
            )}
          </div>
          <form className="search-area" onSubmit={searchCharacter}>
            <input
              type="text"
              placeholder="Find Character..."
              className="search-input"
            />
            <button type="submit" className="button search-button">
              <span className="search-img"></span>
            </button>
          </form>
          <div className="button-container">
            <button className="button favorites-button" onClick={appear}>
              Favorites
            </button>
            <button
              className="button random-button"
              onClick={searchRandomCharacter}
            >
              Random Character
            </button>
          </div>
        </div>
        {selectedCharacter.name !== "" ? (
          <div className="info">
            <div className="info-text">
              <h3>Name:</h3>
              <h4>{selectedCharacter?.name}</h4>
            </div>
            <div className="info-text">
              <h3>Gender:</h3>
              <h4>{selectedCharacter?.gender}</h4>
            </div>
            <div className="info-text">
              <h3>Species:</h3>
              <h4>{selectedCharacter?.species}</h4>
            </div>
            <div className="info-text">
              <h3>Location:</h3>
              <h4>{selectedCharacter?.location.name}</h4>
            </div>
            <div className="info-text">
              <h3>Status:</h3>
              <h4>{selectedCharacter?.status}</h4>
            </div>
            <div className="button-container">
              <button className="button add-button" onClick={addToFavorites}>
                {characters.includes(selectedCharacter)
                  ? "Favorited"
                  : "Add to Favorites"}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
