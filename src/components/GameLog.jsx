import React, { useState, useEffect } from "react";

export default function GameLog(props) {
  const [gameLog, setGameLog] = useState(props.gameLog);
  // const [turnCounter, setTurnCounter] = useState(0);

  useEffect(() => {
    setGameLog(props.gameLog);
  }, [props.gameLog]);

  const renderGameLog = () => {
    if (gameLog.length > 0) {
      const logCards = gameLog.map((elm, i) => {
        if (elm !== undefined) {
          return (
            <span className="log-container" key={elm.code}>
              <img
                className="card-img log-img"
                src={elm.image}
                alt="tableCard"
              ></img>
            </span>
          );
        }
        return logCards;
      });

      return logCards;
    }
  };

  return <div className=" main-log-container">{renderGameLog()}</div>;
}
