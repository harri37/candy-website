import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import * as data from "../data/sweetTalk.json";
import { Link } from "react-router-dom";
import { sweetTalkThumbnails } from "../images/images";

const SweetTalk = () => {
  const articles = data;

  const ArticleLink = ({ title, author, date }) => {
    return (
      <Link to={`/sweetTalk/${title}`}>
        <div className="articleContainer">
          <img src={sweetTalkThumbnails[title]} alt={title} />
          <h3 className="articleTitle">{title}</h3>
          <p className="articleAuthor">{author}</p>
          <p className="articleDate">{date}</p>
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
