import React, { useState, useEffect } from "react";

const Home = () => {
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
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${id.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className="zig-zag-bottom">
        <h1>Candy</h1>

        <p>
          Candy
          <br />
          <br />a multimedia company focusing on the creation of visionary video
          content.
          <br />
          <br />
          from music videos and short films to eventually live events (coming
          soon....), here at Candy we plan to create a massice community and
          platform for like minded creatives all across Australia. We have big
          plans to inspire a new wave of storytellers, whether it be through
          music videos, short films or interviews.
          <br />
          <br />
          at candy we are not videographers, we are storytellers. based out of
          brisbane, australia.
          <br />
          <br />
          join the movement
        </p>
      </div>

      <div className="sep">
        <h1>SCROLLING TEXT HERE</h1>
        <div className="videos">
          {videos.map((video) => (
            <Video {...video} key={video.id} />
          ))}
        </div>
      </div>

      <div className="zig-zag-top">
        <h1>FOOTER HERE</h1>
      </div>
    </>
  );
};

export default Home;
