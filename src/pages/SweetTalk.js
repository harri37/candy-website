import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import * as data from "../data/sweetTalk.json";
import { Link } from "react-router-dom";
import { sweetTalkThumbnails } from "../images/images";

const SweetTalk = () => {
  const articles = data;

  const ArticleLink = ({ title, author, date }) => {
    const formatDate = (date) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const dateArray = date.split("-");
      const year = dateArray[0];
      const month = months[parseInt(dateArray[1]) - 1];
      const day = parseInt(dateArray[2].split("T")[0]);
      return `${month} ${day}, ${year}`;
    };

    return (
      <Link to={`/sweetTalk/${title}`}>
        <div className="articleContainer">
          <img
            src={sweetTalkThumbnails[title]}
            alt={title}
            className="sweettalk_thumb"
          />
          <h3 className="articleTitle">{title}</h3>
          <p className="articleAuthor">{author}</p>
          <p className="articleDate">{formatDate(date)}</p>
        </div>
      </Link>
    );
  };

  return (
    <>
      <Title title="Sweet Talk" />
      {articles.articles.items.map((article) => (
        <ArticleLink {...article} key={article.title} />
      ))}
    </>
  );
};

export default SweetTalk;
