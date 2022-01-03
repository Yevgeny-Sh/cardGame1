import React, { useState, useEffect } from "react";
import DeckOfCards from "./DeckOfCards";
import axios from "axios";
import "./style.css";
import Board from "./Board";

export default function Game() {
  //deck has array of 52 card objects..
  const [deck, setDeck] = useState([]);
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [table, setTable] = useState([]);

  const getDeck = async () => {
    const response = await DeckOfCards.get();
    const deck_id = response.data.deck_id;
    const { data } = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=52`
    );
    setDeck(data.cards);
  };

  useEffect(() => {
    const AsyncDataFetch = async () => {
      await getDeck();
    };
    AsyncDataFetch();
  }, []);

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
      //pop from deck here
      setPlayer1Hand(() => player1);
      setPlayer2Hand(() => player2);
    }
  }, [deck]);
  //renders player 1 hand..
  const renderPlayer1Cards = () => {
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
  //renders player 2 hand..
  const renderPlayer2Cards = () => {
    const cards = player2Hand.map((elm) => {
      return (
        <span key={elm.code} onClick={handleCardChoice}>
          {/* <button> */}
          <img className="card-img" src={elm.image} alt="card" />
          {/* </button> */}
        </span>
      );
    });
    return cards;
  };

  //this is first attck from player
  const handleCardChoice = (event) => {
    let newArr = player1Hand;
    newArr.forEach((element) => {
      if (element.image === event.target.src) {
        let index = newArr.indexOf(element);
        newArr.splice(index, 1);
        setPlayer1Hand(newArr);
        setTable((prevArray) => [...prevArray, element]);
      }
    });
    //take card drom deck after throw
    let drawnCardFromDeck = deck.pop();
    let prePlayer1Hand = player1Hand;
    setPlayer1Hand([...prePlayer1Hand, drawnCardFromDeck]);
  };

  //ui defence functons
  const getNumValueOfTableCard = () => {
    if (table.length) {
      let cardOnTableNumValue = table[0].value;
      //need to compare values of jacks and kings exc..
      switch (cardOnTableNumValue) {
        case "JACK":
          cardOnTableNumValue = 11;
          break;
        case "QUEEN":
          cardOnTableNumValue = 12;
          break;
        case "KING":
          cardOnTableNumValue = 13;
          break;
        case "ACE":
          cardOnTableNumValue = 14;
          break;
        default:
          cardOnTableNumValue = Number(table[0].value);
      }
      return cardOnTableNumValue;
    }
  };

  const getNumValueOfUiHand = (elem) => {
    let numValue = elem.value;
    switch (elem.value) {
      case "JACK":
        numValue = 11;
        break;
      case "QUEEN":
        numValue = 12;
        break;
      case "KING":
        numValue = 13;
        break;
      case "ACE":
        numValue = 14;
        break;
      default:
        numValue = Number(elem.value);
    }
    return numValue;
  };

  useEffect(() => {
    const tryToDefend = () => {
      let counterOfMatchesToThrow = 0;
      let indexOfMatchToThrow = -1;
      if (table.length && player2Hand.length) {
        player2Hand.forEach((element) => {
          if (
            element.suit === table[0].suit &&
            getNumValueOfUiHand(element) > getNumValueOfTableCard()
          ) {
            console.log("found card to defend with");
            console.log(element);
            counterOfMatchesToThrow++;
            indexOfMatchToThrow = player2Hand.indexOf(element);
          }
        });
        //assuming ui found a single card to defend with
        if (counterOfMatchesToThrow === 1) {
          let newArrOfUiCards = player2Hand;
          newArrOfUiCards.splice(indexOfMatchToThrow, 1);
          setPlayer2Hand(newArrOfUiCards);
          setTable([]);
        } else if (counterOfMatchesToThrow === 0) {
          let newArr = player2Hand;
          newArr.push(table[0]);
          setTable([]);
        } else if (counterOfMatchesToThrow > 1) {
          //throw the first one for now
          //TODO make more complicated logic later
          let newArrOfUiCards = player2Hand;
          newArrOfUiCards.splice(indexOfMatchToThrow, 1);
          setPlayer2Hand(newArrOfUiCards);
          setTable([]);
        }
      }
    };

    tryToDefend();
  });

  return (
    <div>
      {renderPlayer1Cards()}
      <p>cards in deck:{deck.length - 12}</p>
      <Board cardsOntable={table}></Board>
      {renderPlayer2Cards()}
    </div>
  );
}
