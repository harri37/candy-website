import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const SweetTalkArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getArticle = async () => {
      const docRef = doc(db, "sweetTalk", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setArticle(docSnap.data());
        console.log("Document data:", docSnap.data());
      } else {
        navigate("/sweet-talk");
      }
      setLoading(false);
    };

    getArticle();
  }, [id, navigate]);

  const Question = ({ question }) => {
    return <h4 className="sweetTalkQuesion">{question}</h4>;
  };

  const Answer = ({ answer }) => {
    return <p className="sweetTalkAnswer">{answer}</p>;
  };

  const Image = ({ image }) => {
    return <img src={image} alt=":)" className="sweetTalkImage" />;
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

    const dateObj = new Date(date.seconds * 1000);
    const month = months[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="sweetTalkContainer">
      <div className="sweetTalkArticle">
        <h1>{article.title}</h1>
        <p className="sweetTalkAuthor">{article.author}</p>
        <p className="sweetTalkDate">{formatDate(article.date)}</p>
        <h2 className="sweetTalkHeader">{article.header}</h2>
        {article.body.split("*").map((item) => {
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
      </div>
    </div>
  );
};

export default SweetTalkArticle;
