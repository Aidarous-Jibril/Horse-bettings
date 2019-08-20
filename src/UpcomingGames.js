import React from "react";
import Table from "./Table";

function UpcomingGames(props) {
 //({race}) can be destructured like so if needed, loop through props(races) from App.js and pass race.start to expand into child comp to expand
  //console.log(props);

  return (
    <div>
      <h4 className="text text-center text-info m-3">Showing closest upcoming game for {props.gameType}</h4>
      {props.races.map(race => (
        <Table
          key={race.id}
          name={race.name}
          date={race.date}
          number={race.number}
          starts={race.starts}
        />
      ))}
    </div>
  );
}

export default UpcomingGames;
