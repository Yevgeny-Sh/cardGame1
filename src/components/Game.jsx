import React, { useState, useEffect, useReducer } from "react";
import DeckOfCards from "./DeckOfCards";
//import Board from "./components/Board";
//import Board from "./Board";

import axios from "axios";
import "./style.css";
export default function Game() {
  //deck has array of 52 card objects..
  const [deck, setDeck] = useState([]);

  const [player1Hand, setPlayer1Hand] = useState([]);
  //const [player2Hand, setPlayer2Hand] = useState([]);
  const [table, setTable] = useState([]);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const getDeck = async () => {
    const response = await DeckOfCards.get();
    const deck_id = response.data.deck_id;
    const { data } = await axios.get(
      `http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=52`
    );
    setDeck(data.cards);
  };

  useEffect(() => {
    const dealPlayersHand = () => {
      let player1 = [];
      let player2 = [];
      // if (deck.length) {
      for (let i = 0; i < 6; i++) {
        player1.push(deck[i]);
      }
      for (let i = 6; i < 12; i++) {
        player2.push(deck[i]);
      }
      setPlayer1Hand(player1);
      // setPlayer2Hand(player2);
      //  }
    };
    const myAsyncCallback = async () => {
      await getDeck();
      dealPlayersHand();
    };
    myAsyncCallback();
  }, []);

  //renders player 1 hand.
  const renderPlayersCards = () => {
    const cards = player1Hand.map((elm) => {
      return (
        <span key={elm.code} onClick={handleCardChoice}>
          <button className="card-btn">
            <img src={elm.image} alt="card" />
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
        forceUpdate(); //.
        setTable((prevArray) => [...prevArray, element]);
      }
    });
  };
  //..

  const renderTable = () => {
    if (table.length) {
      const tableCards = table.map((elm) => {
        return (
          <span key={elm.code}>
            <img className="card-btn" src={elm.image} alt="tableCard"></img>
          </span>
        );
      });
      return tableCards;
    }
  };
  return (
    <div>
      {renderPlayersCards()}
      table:
      {renderTable()}
    </div>
  );
}
