import React from "react";
import { useParams } from "react-router-dom";
import * as data from "../data/sweetTalk.json";
import { sweetTalkImages } from "../images/images";
import Title from "../components/Title";

const SweetTalkArticle = () => {
  const articles = data;
  const { title } = useParams();
  const article = articles.articles.items.find(
    (article) => article.title === title
  );

  const articleArray = article.body.split("*");

  const Question = ({ question }) => {
    return <h4 className="sweetTalkQuesion">{question}</h4>;
  };

  const Answer = ({ answer }) => {
    return <p className="sweetTalkAnswer">{answer}</p>;
  };

  const Image = ({ image }) => {
    return (
      <img
        src={sweetTalkImages[title][image]}
        alt={image}
        className="sweetTalkImage"
      />
    );
  };

  const Footer = ({ footer }) => {
    return <p className="sweetTalkFooter">{footer}</p>;
  };

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
    <>
      <Title title="Sweet Talk" />
      <h1 className="sweetTalkTitle">{article.title}</h1>
      <p className="sweetTalkAuthor">{article.author}</p>
      <p className="sweetTalkDate">{formatDate(article.date)}</p>
      <h2 className="sweetTalkHeader">{article.header}</h2>
      {articleArray.map((item) => {
        const type = item.charAt(0);
        const content = item.slice(1);

        switch (type) {
          case "q":
            return <Question question={content} key={content} />;
          case "p":
            return <Answer answer={content} key={content} />;
          case "i":
            return <Image image={content} key={content} />;
          case "f":
            return <Footer footer={content} key={content} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default SweetTalkArticle;
