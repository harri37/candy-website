import React from "react";
import { logo, watermark } from "../images/images";

const Home = () => {
  return (
    <div className="home-content">
      <div className="home-logo">
        <img src={logo} alt="logo" />
      </div>

      <h1>Why Candy?</h1>

      <div className="home-heading">
        <p>Live life like a kid in candy store and you can't go wrong.</p>
      </div>

      <h2>Welcome.</h2>

      <p>
        Candy is a community based creative brand and media platform with an
        emphasis on narrative.
        <br />
        <br />
        We are all born storytellers, and at Candy we believe there isn't a
        stronger connection between people than storytelling.
        <br />
        <br />
        Through the clothing, videos, events and everything else created by
        Candy, we aim to foster a community of individuals who strive to be
        unique, who search for new experiences and memories, and who although
        may grow old, refuse to grow up.
        <br />
        <br />
        Candy isn't just a brand, it isn't about the clothes you wear, or the
        way you walk or talk, Candy is an attitude, it's a way of life. Best
        described as being a kid in a candy store.
      </p>
      <div className="home-logo">
        <img src={watermark} alt="watermark" />
      </div>
      <h3>
        Brisbane,
        <br />
        Australia
      </h3>
    </div>
  );
};

export default Home;
