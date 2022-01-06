import React from "react";
import { Link } from "react-router-dom";
import redQueen from "./assets/images/redQueenCropped.jpg";

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="home-header">the red queen</div>
      <img className="redQueen-img" src={redQueen} alt="redQueen" />
      <Link to="/Instructions" className="home-btn instructions-btn">
        how to play
      </Link>
      <Link to="/game" className="home-btn play-btn">
        play
      </Link>
    </div>
  );
}
