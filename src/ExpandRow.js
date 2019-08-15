import React, { useState } from "react";
import "./Table.css";

function StartRow({ start, horse }) {
  //console.log(start) console.log(horse)
  //const trainer = horse.trainer

  //destructing horse.trainer props
  const trainer = horse.trainer;
  const [expanded, setExpanded] = useState(false);

  //toggle to expand by using true or false of expanded value
  const toggleExpand = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <React.Fragment>
      <tr onClick={toggleExpand}>
        <td>#{start.number}</td>
        <td>{start.horse.name}</td>
        <td>
          {" "}
          {start.driver.firstName} {start.driver.lastName}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td>
            <p>
              Trainer name:{" "}
              <span style={getStyle}>
                {" "}
                {trainer.firstName} {trainer.lastName}
              </span>{" "}
            </p>
            <p>
              Horse name:{" "}
              <span style={getStyle}> {horse.pedigree.father.name}</span>{" "}
            </p>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}

const getStyle = {
  fontFamily: "Arial",
  fontSize: "16px",
  color: "#8B0000",
  paddingLeft: "5px"
};
export default StartRow;
