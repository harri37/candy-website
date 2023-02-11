import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../firebase";

const SweetTalk = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      const q = query(collection(db, "sweetTalk"));
      const querySnapshot = await getDocs(q);
      setArticles(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
      setLoading(false);
    };

    getArticles();
  }, []);

  const ArticleLink = ({ title, author, date, thumbnail, id }) => {
    const formatDate = (date) => {
      const dateObj = new Date(date.seconds * 1000);
      const dateStr = dateObj.toISOString();
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

      const dateArray = dateStr.split("-");
      const year = dateArray[0];
      const month = months[parseInt(dateArray[1]) - 1];
      const day = parseInt(dateArray[2].split("T")[0]);
      return `${month} ${day}, ${year}`;
    };

    return (
      <Link to={`/sweetTalk/${id}`}>
        <div className="card-link">
          <div className="card-link-image">
            <img src={thumbnail} alt={title} className="sweettalk_thumb" />
          </div>
          <div className="card-link-text">
            <h3>{title}</h3>
            <p>{author}</p>
            <p>{formatDate(date)}</p>
          </div>
        </div>
      </Link>
    );
  };

  console.log("articles", articles);
  return loading ? (
    <p>Loading</p>
  ) : (
    <>
      <Title title="Sweet Talk" />
      {articles.map((article, index) => (
        <ArticleLink key={index.toString()} {...article} />
      ))}
    </>
  );
};

export default SweetTalk;
