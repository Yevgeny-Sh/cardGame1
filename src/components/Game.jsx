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
  const [winner, setWinner] = useState("");

  const STRONG_SUIT = "DIAMONDS";

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

  //deal hand to each player
  useEffect(() => {
    let newArr = deck;
    let player1 = [];
    let player2 = [];
    if (deck.length) {
      // i deal from the bottom of the deck
      for (let i = 0; i < 6; i++) {
        player1.push(deck[i]);
        newArr.splice(i, 1);
      }
      for (let i = 6; i < 12; i++) {
        player2.push(deck[i]);
        newArr.splice(i, 1);
      }

      setPlayer1Hand(() => player1);
      setPlayer2Hand(() => player2);
    }
    //pop from deck here
    setDeck(newArr);
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
  // renders player 2 hand..
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
    if (player1Hand.length > 0) {
      let newArr = player1Hand;
      newArr.forEach((element) => {
        if (element.image === event.target.src) {
          let index = newArr.indexOf(element);
          newArr.splice(index, 1);
          setPlayer1Hand(newArr);
          setTimeout(() => {
            setTable((prevArray) => [...prevArray, element]);
          }, 500);
        }
      });
    }
    //take card from deck after throw
    if (deck.length > 0 && player1Hand.length < 6) {
      let drawnCardFromDeck = deck.pop();
      let prePlayer1Hand = player1Hand;
      setPlayer1Hand([...prePlayer1Hand, drawnCardFromDeck]);
    }
    checkWinner();
  };

  //need to compare values of jacks and kings exc..
  const getNumValueOfTableCard = () => {
    if (table.length) {
      let cardOnTableNumValue = table[0].value;
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
      if (deck.length || (player1Hand.length && player2Hand.length)) {
        let counterOfMatchesToThrow = 0;
        let indexOfMatchToThrow = -1;
        if (table.length && player2Hand.length) {
          player2Hand.forEach((element) => {
            if (
              element.suit === table[0].suit &&
              getNumValueOfUiHand(element) > getNumValueOfTableCard()
            ) {
              counterOfMatchesToThrow++;
              indexOfMatchToThrow = player2Hand.indexOf(element);
            }
          });
          //assuming ui found a single card to defend with
          if (counterOfMatchesToThrow === 1) {
            console.log(
              "ui found single card to edfend with",
              player2Hand[indexOfMatchToThrow]
            );
            let newArrOfUiCards = player2Hand;
            newArrOfUiCards.splice(indexOfMatchToThrow, 1);
            setPlayer2Hand(newArrOfUiCards);
            //draw new card from deck
            if (deck.length > 0 && player2Hand.length < 6) {
              let drawnCardFromDeck = deck.pop();
              let prePlayer2Hand = player2Hand;
              setPlayer2Hand([...prePlayer2Hand, drawnCardFromDeck]);
            }
            setTable([]);
            //ui found mor then 1 card to defend with
          } else if (counterOfMatchesToThrow > 1) {
            //throw the first one for now
            //TODO make more complicated logic later
            let newArrOfUiCards = player2Hand;
            newArrOfUiCards.splice(indexOfMatchToThrow, 1);
            //draw new card from deck
            if (deck.length > 0 && player2Hand.length < 6) {
              let drawnCardFromDeck = deck.pop();
              setPlayer2Hand([...newArrOfUiCards, drawnCardFromDeck]);
            }
            setTable([]);
            //! no reg card to defend
          } else if (
            counterOfMatchesToThrow === 0 &&
            table[0].suit !== STRONG_SUIT
          ) {
            //! but try to defend with kozir
            let FoundStrongSuitCard = player2Hand.find(
              (elm) => elm.suit === STRONG_SUIT
            );
            // if found strong suit in UI hand
            if (FoundStrongSuitCard !== undefined) {
              console.log("UI has strong suit card to defend with");
              let indexOfMatchToThrow =
                player2Hand.indexOf(FoundStrongSuitCard);
              console.log("found strong card to throw :", FoundStrongSuitCard);
              let newArrOfUiCards = player2Hand;
              newArrOfUiCards.splice(indexOfMatchToThrow, 1);
              setPlayer2Hand(newArrOfUiCards);
              setTable([]);
              //now draw card
              if (deck.length > 0 && player2Hand.length < 6) {
                console.log("if is true,drawing");
                let drawnCardFromDeck = deck.pop();
                setPlayer2Hand([...newArrOfUiCards, drawnCardFromDeck]);
              }
              //no strong suit card found
            } else if (FoundStrongSuitCard === undefined) {
              console.log("no strong suit card to UI, ui needs to take card");
              let newArr2 = player2Hand;
              newArr2.push(table[0]);
              setPlayer2Hand(newArr2);
              setTable([]);
            }
            //! strong suit on table, and ui cant defend
          } else if (
            counterOfMatchesToThrow === 0 &&
            table[0].suit === STRONG_SUIT
          ) {
            //take card
            let newArr3 = player2Hand;
            newArr3.push(table[0]);
            setPlayer2Hand(newArr3);
            setTable([]);
          }
        }
        //if deck is empty or a player has no cards in hand
      } else {
        checkWinner();
      }
      //end of tryToDefend()
    };
    tryToDefend();
    //end of useEffect
  });

  //!check if there is winnr function
  const checkWinner = () => {
    if (player1Hand.length > 0 && player2Hand.length === 0) {
      setWinner("player2");
      return;
    } else if (player2Hand.length > 0 && player1Hand.length === 0) {
      setWinner("player1");
      return;
    }
  };

  return (
    <div>
      strong suit is :{STRONG_SUIT}
      <p>cards in deck:{deck.length}</p>
      {renderPlayer1Cards()}
      <Board cardsOntable={table}></Board>
      {renderPlayer2Cards()}
      {winner.length > 0 && <div className="winner">winner is {winner}</div>}
    </div>
  );
}
