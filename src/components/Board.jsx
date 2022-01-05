import React, { useState, useEffect } from "react";

export default function Board(props) {
  const [cardsOntable, setCardsOntable] = useState(props.cardsOntable);
  const [lastTurnCard, setLastTurnCard] = useState(props.lastTurnCard);

  useEffect(() => {
    setCardsOntable(props.cardsOntable);
    setLastTurnCard(props.lastTurnCard);
  }, [props.cardsOntable, props.lastTurnCard]);

  const renderTable = () => {
    const tableCards = cardsOntable.map((elm) => {
      return (
        <span key={elm.code}>
          <img className="card-img" src={elm.image} alt="tableCard"></img>
        </span>
      );
    });
    return tableCards;
  };
  const renderLastTurnCard = () => {
    if (lastTurnCard) {
      const tableCards = lastTurnCard.map((elm) => {
        return (
          <span key={elm.code}>
            <img className="card-img" src={elm.image} alt="tableCard"></img>
          </span>
        );
      });
      return tableCards;
    } else return <div></div>;
  };
  console.log(lastTurnCard);
  return (
    <div className="board-container">
      {/* {renderTable()} */}
      {renderLastTurnCard()}
    </div>
  );
}
