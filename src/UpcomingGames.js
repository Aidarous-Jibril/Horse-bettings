import React from "react";
import Table from "./Table";

function UpcomingGames(props) {
  //looping through props(races) sent from parent comp and pass race.start to expand into child comp to expand
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
      console.log(race.date);
    </div>
  );
}

export default UpcomingGames;
