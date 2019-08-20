import React from "react";
import Table from "./Table";
function Results(props) {
    //console.log(props);

  return (
    <div>
      <h4 className="text text-center text-info m-3">Showing closest results game for {props.gameType}</h4>
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

export default Results;
