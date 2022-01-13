import React, { useState } from "react";
import "./App.css";
import UpcomingGames from "./UpcomingGames";
import Result from "./Results";
import Navbar from "./components/Navbar";

//Input functional component
function InputContainer({ onChange }) {
  return (
    <section className="container-fluid bg-success pt-5">
      <div className="form-group container">
        <h2 className="display-4 text-center">
          Enter one of following Game type:
        </h2>
        <h5 className="text text-danger text-center">(V75, V65, V64 or V4)</h5>
        <input
          onChange={onChange}
          placeholder="Type of game..."
          className="form-control form-control-lg"
        />
      </div>
    </section>
  );
}

//declare var for allowed game types
const AVAILABLE_GAME_TYPES = ["V75", "V65", "V64", "V4"];

function App() {
  const [gameType, setGameType] = useState("");
  const [upcomingRace, setUpcomingRace] = useState(null);
  const [racesResult, setRacesResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState("upcoming");

  //handle change
  const handleChange = event => {
    const value = event.target.value.toUpperCase();
    if (AVAILABLE_GAME_TYPES.includes(value)) {
      setIsLoading(true);
      setGameType(value);
      //fetching url endpoint with user input
      const fetchUrl = `https://www.atg.se/services/racinginfo/v1/api/products/${value}`;
      return fetch(fetchUrl)
        .then(res => res.json())
        .then(data => {      console.log(data);
          return sortAndFetchData(data);
        })
        .catch(error => {
          console.log("Error", error);
        });
    }
  };

  //sorting fetched data and pick whatever is at the index 0 because that is the closest, earliest or newest bcz upc has more than 1 game init
  const sortAndFetchData = data => {
    let upcoming;
    let result;
    //check if there is any upcoming games
    if (data.upcoming && data.upcoming.length > 0) {
      upcoming = data.upcoming.sort(
        (a, b) => new Date(b.startTime) - new Date(a.startTime)
      )[0];
      fetchLatestGameAndResult(upcoming.id, "upcoming");
      // console.log(upcoming)
    } else {
      setIsLoading(false);
      setUpcomingRace({ races: null });
    }
    // games may not have results, so check game results
    if (data.results && data.results.length > 0) {
      result = data.results.sort(
        (a, b) => new Date(b.startTime) - new Date(a.startTime)
      )[0];
      fetchLatestGameAndResult(result.id, "result");
    } else {
      setIsLoading(false);
      setRacesResult({ races: null });
    }
  };

  //fetch API endpoint with the id of chosen game from schedule table
  const fetchLatestGameAndResult = (id, type) => {
    const url = `https://www.atg.se/services/racinginfo/v1/api/games/${id}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (type === "upcoming") {
          setIsLoading(false);
          setUpcomingRace(data) 
          //console.log(data); //this data is attached to races data
        } else if (type === "result") {
          setIsLoading(false);
          setRacesResult(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  //handleClick accepts an argument to store setSelected()
  const handleClck = selected => {
    setSelected(selected);
  };

  let render;
  if (upcomingRace || racesResult) {
    //storing the selected value render variable and passing data to child components
    render =
      selected === "upcoming" ? (
        <UpcomingGames races={upcomingRace.races} gameType={gameType} />
      ) : (
        <Result races={racesResult.races} gameType={gameType} />
      );
  }
  return (
    <main>
      <Navbar />
      <InputContainer onChange={handleChange} />
      <nav>
        <button style={btnStyle} onClick={() => handleClck("upcoming")}>Upcoming</button>
        <button style={btnStyle} onClick={() => handleClck("result")}>Result</button>         
      </nav>
      {isLoading && <p className="loading">Loading...</p> }
      {render ? (
        <div className={isLoading ? "low-opacity" : ""}>{render}</div>
      ) : (
        <h4 className="text-center pt-3">
          Please enter a valid game type 
        </h4>
      )}
    </main>
  );
}

//buttons style
const btnStyle = {
  width: "20%",
  backgroundColor: "#555555",
  color: "white",
  padding: "12px 22px",
  display: "inline",
  marginLeft: "20%",
  marginTop: "5px",
  borderRadius: "5%",
  border: "2px solid #ffffff"
};

export default App;


