import React, { useState, useEffect } from "react";

export default function Board(props) {
  const [cardsOntable, setCardsOntable] = useState(props.cardsOntable);
  //const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setCardsOntable(props.cardsOntable);
  }, [props.cardsOntable]);

  const renderTable = () => {
    const tableCards = cardsOntable.map((elm) => {
      return (
        <span key={elm.code}>
          <img className="card-img" src={elm.image} alt="tableCard"></img>
        </span>
      );
    }, []);
    return tableCards;
  };

  return <div className="board-container">{renderTable()}</div>;
}
