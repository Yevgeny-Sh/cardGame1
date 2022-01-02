import axios from "axios";

export default axios.create({
  baseURL: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
});
