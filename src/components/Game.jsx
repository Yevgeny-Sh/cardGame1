import React, { useState, useEffect } from "react";
import DeckOfCards from "./DeckOfCards";
//import Board from "./components/Board";
//import Board from "./Board";

import axios from "axios";
import "./style.css";
import Board from "./Board";
export default function Game() {
  //deck has array of 52 card objects..
  const [deck, setDeck] = useState([]);

  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [table, setTable] = useState([]);

  //const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const getDeck = async () => {
    const response = await DeckOfCards.get();
    const deck_id = response.data.deck_id;
    const { data } = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=52`
    );
    setDeck(data.cards);
  };

  useEffect(() => {
    let player1 = [];
    let player2 = [];
    if (deck.length) {
      for (let i = 0; i < 6; i++) {
        player1.push(deck[i]);
      }
      for (let i = 6; i < 12; i++) {
        player2.push(deck[i]);
      }
      setPlayer1Hand(() => player1);
      setPlayer2Hand(player2);
    }
  }, [deck]);

  useEffect(() => {
    const myAsyncDataFetch = async () => {
      await getDeck();
    };
    myAsyncDataFetch();
  }, []);
  //renders player 1 hand..
  const renderPlayersCards = () => {
    const cards = player1Hand.map((elm) => {
      return (
        <span key={elm.code} onClick={handleCardChoice}>
          <button>
            <img className="card-img" src={elm.image} alt="card" />
          </button>
        </span>
      );
    });
    return cards;
  };

  const handleCardChoice = (event) => {
    let newArr = player1Hand;
    newArr.forEach((element) => {
      if (element.image === event.target.src) {
        newArr.pop(element);
        setPlayer1Hand(newArr);
        setTable((prevArray) => [...prevArray, element]);
      }
    });
  };

  return (
    <div>
      {renderPlayersCards()}
      <Board cardsOntable={table}></Board>
    </div>
  );
}
