import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem/NewsItem";
import Loader from "../Loader/Loader";

import { getNews } from "../../api";

import "./NewsFeed.scss";

const NewsFeed = ({ themeStyle }) => {
  const [news, setNews] = useState([]);

  const newsFeedStyle = {
    backgroundColor: themeStyle.mainColor
  };

  useEffect(() => {
    getNews().then(setNews);
  }, []);

  return (
    <React.Fragment>
      {news.length === 0 ? (
        <div className="news-loader" style={newsFeedStyle}>
          <Loader />
        </div>
      ) : (
        <div className="news-feed" style={newsFeedStyle}>
          {news.map(newsItem => {
            return (
              <NewsItem
                title={newsItem.title}
                content={newsItem.content}
                key={newsItem.id}
                themeStyle={themeStyle}
              />
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default NewsFeed;
