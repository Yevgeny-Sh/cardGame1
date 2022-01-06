import React, { useState, useEffect } from "react";

export default function Board(props) {
  const [lastTurnCard, setLastTurnCard] = useState(props.lastTurnCard);

  useEffect(() => {
    setLastTurnCard(props.lastTurnCard);
  }, [props.cardsOntable, props.lastTurnCard]);

  const renderLastTurnCard = () => {
    if (lastTurnCard) {
      console.log(lastTurnCard);
      if (
        lastTurnCard.length > 1 &&
        lastTurnCard[lastTurnCard.length - 1] !== undefined &&
        lastTurnCard[lastTurnCard.length - 2] !== undefined
      ) {
        const tableCards = lastTurnCard.map((elm) => {
          return (
            <span key={elm.code}>
              <img className="card-img" src={elm.image} alt="tableCard"></img>
            </span>
          );
        });
        return tableCards;
      } else if (lastTurnCard.src !== undefined) {
        return (
          <img
            className="card-img"
            src={lastTurnCard.image}
            alt="tableCard"
          ></img>
        );
      }
    } else return <div></div>;
  };

  return <div className="board-container">{renderLastTurnCard()}</div>;
}
