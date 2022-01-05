import React, { useState, useEffect } from "react";

export default function GameLog(props) {
  const [gameLog, setGameLog] = useState(props.gameLog);
  // const [turnCounter, setTurnCounter] = useState(0);

  useEffect(() => {
    setGameLog(props.gameLog);
  }, [props.gameLog]);

  // useEffect(() => {
  //   setTurnCounter((prevCounter) => {
  //     return prevCounter + 1;
  //   });
  // }, [gameLog]);

  const renderGameLog = () => {
    if (gameLog.length > 0) {
      const strings = gameLog.map((elm, i) => {
        if (elm !== undefined) {
          return (
            <span className="log-container" key={elm.code}>
              {/* <span>turn {turnCounter}</span> */}
              <img
                className="card-img log-img"
                src={elm.image}
                alt="tableCard"
              ></img>
            </span>
          );
        } else return <span key={i}></span>;
      });
      if (strings.length > 0) {
        return strings;
      }
    }
  };

  return <div>{renderGameLog()}</div>;
}
