import React from "react";
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
        cardOnTableNumValue = table[0].value;
    }
    return cardOnTableNumValue;
  }
};

const getNumValueOfUiHand = () => {
  if (player2hand.length) {
    player2Hand.forEach((elem) => {
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
          numValue = elem.value;
      }
    });
    return numValue;
  }
};
const uiDefendsWithSingleCard = () => {
  let newArrOfUiCards = player2Hand;
  newArrOfUiCards.splice(indexOfMatchToThrow, 1);
  setPlayer2Hand(newArrOfUiCards);
  setTable([]);
};

const tryToDefend = () => {
  let counterOfMatchesToThrow = 0;
  let indexOfMatchToThrow = -1;
  if (table.length && player2Hand.length) {
    player2Hand.forEach((element) => {
      if (
        element.suit === table[0].suit &&
        getNumValueOfUiHand() > getNumValueOfTableCard()
      ) {
        console.log("found card to defend with");
        counterOfMatchesToThrow++;
        indexOfMatchToThrow = player2Hand.indexOf(elem);
      }
    });
    //assuming ui found a card to defend with
    if (counterOfMatchesToThrow === 1) {
      let newArrOfUiCards = player2Hand;
      newArrOfUiCards.splice(indexOfMatchToThrow, 1);
      setPlayer2Hand(newArrOfUiCards);
      setTable([]);
    }
  }
};

const checkWinner = () => {
  if (player1Hand.length) {
    setWinner("player2");
    return;
  } else if (player2Hand.length) {
    setWinner("player1");
    return;
  }
};
