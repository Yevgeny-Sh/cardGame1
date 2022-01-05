//
getMatchesToThrow = (indexOfMatchToThrow) => {
  player2Hand.forEach((element) => {
    if (
      element.suit === table[0].suit &&
      getNumValueOfAiHand(element) > getNumValueOfTableCard()
    ) {
      counterOfMatchesToThrow++;
      indexOfMatchToThrow = player2Hand.indexOf(element);
    }
  });
};

AiFoundSingleDefenceCard = (indexOfMatchToThrow) => {
  console.log(
    "ai found single card to edfend with",
    player2Hand[indexOfMatchToThrow]
  );
  let newArrOfAiCards = player2Hand;
  newArrOfAiCards.splice(indexOfMatchToThrow, 1);
  setPlayer2Hand(newArrOfAiCards);
  //draw new card from deck
  if (deck.length > 0 && player2Hand.length < 6) {
    let drawnCardFromDeck = deck.pop();
    let prePlayer2Hand = player2Hand;
    setPlayer2Hand([...prePlayer2Hand, drawnCardFromDeck]);
  }
  setTable([]);
};

AiFoundSeveralDefenceCards = (indexOfMatchToThrow) => {
  //throw the first one for now
  //TODO make more complicated logic later
  let newArrOfAiCards = player2Hand;
  newArrOfAiCards.splice(indexOfMatchToThrow, 1);
  //draw new card from deck
  if (deck.length > 0 && player2Hand.length < 6) {
    let drawnCardFromDeck = deck.pop();
    setPlayer2Hand([...newArrOfAiCards, drawnCardFromDeck]);
  }
  setTable([]);
};

const AiFoundSeveralStrongSuitToDefendWith = () => {
  console.log("AI has strong suit card to defend with");
  let indexOfMatchToThrow = player2Hand.indexOf(FoundStrongSuitCard);
  console.log("found strong card to throw :", FoundStrongSuitCard);
  let newArrOfAiCards = player2Hand;
  newArrOfAiCards.splice(indexOfMatchToThrow, 1);
  setPlayer2Hand(newArrOfAiCards);
  setTable([]);
  //now draw card
  if (deck.length > 0 && player2Hand.length < 6) {
    console.log("if is true,drawing");
    let drawnCardFromDeck = deck.pop();
    setPlayer2Hand([...newArrOfAiCards, drawnCardFromDeck]);
  }
};

const AiCantDefendDrawsCard = () => {
  console.log("no strong suit card to AI, Ai needs to take card");
  let newArr2 = player2Hand;
  newArr2.push(table[0]);
  setPlayer2Hand(newArr2);
  //!see if this works..
  setTimeout(() => {
    setTable([]);
  }, 500);
};

const tryToDefend = () => {
  if (deck.length || (player1Hand.length && player2Hand.length)) {
    let counterOfMatchesToThrow = 0;
    let indexOfMatchToThrow = -1;
    if (table.length && player2Hand.length) {
      //!
      getMatchesToThrow();
      //assuming ai found a single card to defend with
      if (counterOfMatchesToThrow === 1) {
        AiFoundSingleDefenceCard();
      } else if (counterOfMatchesToThrow > 1) {
        //Ai found mor then 1 card to defend with
        AiFoundSeveralDefenceCards();
        //! no reg card to defend
      } else if (
        counterOfMatchesToThrow === 0 &&
        table[0].suit !== strongSuit
      ) {
        //! but try to defend with kozir
        let FoundStrongSuitCard = player2Hand.find(
          (elm) => elm.suit === strongSuit
        );
        // if found strong suit in AI hand
        if (FoundStrongSuitCard !== undefined) {
          AiFoundSeveralStrongSuitToDefendWith();
          //no strong suit card found
        } else if (FoundStrongSuitCard === undefined) {
          AiCantDefendDrawsCard();
        }
        //! strong suit on table, and Ai cant defend
      } else if (
        counterOfMatchesToThrow === 0 &&
        table[0].suit === strongSuit
      ) {
        //take card
        AiCantDefendDrawsCard();
      }
    }
    //if deck is empty or a player has no cards in hand
  } else {
    checkWinner();
  }
};
