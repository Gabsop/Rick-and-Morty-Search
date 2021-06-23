import "./styles.css";
import Logo from "../../assets/logo.png";
// import Search from "../../assets/search.png";

import axios from "axios";
import { useState } from "react";

const Home = () => {
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

  const searchCharacter = async () => {
    const input = document.querySelector("input");

    try {
      await axios
        .get(`https://rickandmortyapi.com/api/character/?name=${input?.value}`)
        .then((response) => {
          setSelectedCharacter(response?.data?.results[0]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const searchRandomCharacter = async () => {
    const random = Math.round(Math.random() * 671);
    console.log(random);

    try {
      await axios
        .get(`https://rickandmortyapi.com/api/character/${random}`)
        .then((response) => {
          setSelectedCharacter(response?.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <img src={Logo} alt="Rick and Morty" />
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
          <div className="search-area">
            <input
              type="text"
              placeholder="Find Character..."
              className="search-input"
            />
            <button className="search-button" onClick={searchCharacter}>
              <span className="search-img"></span>
            </button>
          </div>
          <button className="favorites-button">Favorites</button>
          <button className="random-button" onClick={searchRandomCharacter}>
            Random Character
          </button>
        </div>
        {selectedCharacter.name !== "" ? (
          <div className="info">
            <div className="info-text">
              <h3>Name:</h3>
              <h4>{selectedCharacter.name}</h4>
            </div>
            <div className="info-text">
              <h3>Gender:</h3>
              <h4>{selectedCharacter.gender}</h4>
            </div>
            <div className="info-text">
              <h3>Species:</h3>
              <h4>{selectedCharacter.species}</h4>
            </div>
            <div className="info-text">
              <h3>Location:</h3>
              <h4>{selectedCharacter.location.name}</h4>
            </div>
            <div className="info-text">
              <h3>Status:</h3>
              <h4>{selectedCharacter.status}</h4>
            </div>
            <div className="info-button-container">
              <button className="add">Add to your Favorites</button>
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
