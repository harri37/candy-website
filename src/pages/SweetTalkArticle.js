import React from "react";
import { useParams } from "react-router-dom";
import * as data from "../data/sweetTalk.json";

const SweetTalkArticle = () => {
  const articles = data;
  const { title } = useParams();
  const article = articles.articles.items.find(
    (article) => article.title === title
  );

  return <div>{article.body}</div>;
};

export default SweetTalkArticle;
