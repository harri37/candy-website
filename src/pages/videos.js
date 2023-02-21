import React, { useState, useEffect } from "react";
import Title from "../components/Title";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.REACT_APP_CANDY_CHANNEL_ID}&key=${process.env.REACT_APP_YOUTUBE_KEY}&maxResults=50`
        );
        console.log("res", res);
        const data = await res.json();
        const videos = data.items.filter(
          (item) => item.id.kind === "youtube#video"
        );
        console.log(videos);
        setVideos(videos);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchVideos();
  }, []);

  const Video = ({ snippet, id }) => {
    return (
      // <a href={`https://www.youtube.com/watch?v=${id.videoId}`}>
      //   <div className="videoContainer">
      //     <img src={snippet.thumbnails.high.url} alt={snippet.title} />
      //     <h3 className="videoTitle">{snippet.title}</h3>
      //   </div>
      // </a>
      <div className="videoContainer">
        <iframe
          title={snippet.title}
          width="565"
          height="315"
          frameBorder="0"
          src={`https://www.youtube.com/embed/${id.videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  return loading ? (
    <p>Loading</p>
  ) : (
    <div className="content-area">
      <Title title="Videos" />
      {videos.map((video, index) => (
        <Video {...video} key={index.toString()} />
      ))}
    </div>
  );
};

export default Videos;
