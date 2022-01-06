import React, { useState } from "react";

export default function Winner(props) {
  const [winner] = useState(props.winner);

  return (
    <div className="winner-container">
      <h1 className="winner-text"> winner is {winner} </h1>
      <button className="winner-btn" onClick={props.newGameFunc}>
        new game
      </button>
    </div>
  );
}
