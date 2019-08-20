import React from "react";
import "./Table.css";
import ExpandRow from "./ExpandRow";

function Table(props) { 
  //console.log(props)
  return (
    <table className="Table">
     <thead>
        <tr>
          <th>#{props.number}</th>
          <th>{props.name ? props.name : "Name not available"}</th>
          <th>{props.date}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="thead-dark">
          <td>
            <b>Start Number</b>
          </td>
          <td>
            <b>Horse</b>
          </td>
          <td>
            <b>Driver</b>
          </td>
        </tr>

        {props.starts.map(start => (
          <ExpandRow key={start.number} start={start} horse={start.horse} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;

