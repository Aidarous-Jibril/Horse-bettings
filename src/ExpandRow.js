import React, { useState } from "react";
import "./Table.css";

function StartRow({ start, horse }) {
  //console.log(start) console.log(horse)

  //destructing horse.trainer props
  const trainer = horse.trainer;
  const [expanded, setExpanded] = useState(false);

  //toggle to expand by using true or false of expanded boolean
  const toggleExpand = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <React.Fragment>
      <tr onClick={toggleExpand} >
        <td>#{start.number}</td>
        <td>{start.horse.name}</td>
        <td>{start.driver.firstName} {start.driver.lastName}  </td>
      </tr>
      {expanded && (
        <tr >
          <td>            
            <span style={getStyle}>Trainer firstname:</span><br></br> {trainer.firstName} 
          </td>
          <td>            
            <span style={getStyle}>Trainer lastname:</span><br></br> {trainer.lastName}
          </td>
          <td>            
            <span style={getStyle}>Horse father name:</span><br></br> {horse.pedigree.father.name}    
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}

//style
const getStyle = {
  fontFamily: "Arial",
  fontWeight: "bolder",
  color: "#8B0000"
};
export default StartRow;
