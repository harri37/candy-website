import React from "react";
import { socials } from "../images/images";

const Footer = () => {
  return (
    <footer className="footer">
      <a
        href="https://www.instagram.com/acandyproduction/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={socials.insta} alt="instagram" />
      </a>
      <a
        href="https://www.tiktok.com/@acandyproduction?lang=en"
        target="_blank"
        rel="noreferrer"
      >
        <img src={socials.tiktok} alt="tiktok" />
      </a>
      <a
        href="https://www.youtube.com/@CANDY.ONLINE"
        target="_blank"
        rel="noreferrer"
      >
        <img src={socials.youtube} alt="youtube" />
      </a>
    </footer>
  );
};

export default Footer;
