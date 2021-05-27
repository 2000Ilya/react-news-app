import React, { useEffect, useState, useRef } from "react";

import NewsItem from "./NewsItem/NewsItem";
import Loader from "../Loader/Loader";
import Header from "../../components/Header/Header";

import { getNews } from "../../api";

import { ReactComponent as RefreshLoader } from "../../assets/icons/loading-arrow.svg";

import "./NewsFeed.scss";

const NewsFeed = ({ themeStyle, isNewsFeedShowing, setNewsFeedShowing }) => {
  const newsFeedEl = useRef(null);
  const refreshLoaderEl = useRef(null);
  const refreshLoaderContainerEl = useRef(null);

  const [pageLoadingNumber, setPageLoadingNumber] = useState(1);
  const [isBottomLoaderShowing, setBottomLoaderShowing] = useState(false);
  const [isNewsFeedLoading, setNewsFeedLoading] = useState(true);
  const [news, setNews] = useState(
    localStorage.news === undefined ? [] : JSON.parse(localStorage.news)
  );

  const headerTitle = isNewsFeedShowing ? "Новости" : "Темы";

  const newsFeedStyle = {
    backgroundColor: themeStyle.mainColor
  };

  const refreshLoaderStyle = {
    fill: themeStyle.secondColor
  };

  useEffect(() => {
    setPageLoadingNumber(1);
    getNewsFeed(1);
  }, []);

  const getNewsFeed = pageNumber => {
    getNews(pageNumber)
      .then(resolve => {
        if (pageNumber > 1) {
          setNews(news.concat(resolve));
          localStorage.news = JSON.stringify(
            JSON.parse(localStorage.news).concat(resolve)
          );
          setBottomLoaderShowing(false);
        } else {
          setNews(resolve);
          localStorage.news = JSON.stringify(resolve);
        }
      })
      .catch(error => console.error(error))
      .then(() => {
        setNewsFeedLoading(false);
        if (pageNumber > 1) {
          scrollNewsPageTo(newsFeedEl.current.scrollTop);
        } else {
          scrollNewsPageTo(refreshLoaderEl.current.clientHeight);
          stopInertiaScroll(refreshLoaderEl.current.clientHeight);
        }
      });
  };

  const onScroll = () => {
    if (!isNewsFeedLoading) {
      if (newsFeedEl.current.scrollTop === 0 && window.innerWidth < 1025) {
        callRefreshLoader();
      } else if (
        newsFeedEl.current.scrollTop ===
        newsFeedEl.current.scrollHeight - newsFeedEl.current.offsetHeight
      ) {
        callLoadMoreLoader();
      } else if (
        newsFeedEl.current.scrollTop < refreshLoaderEl.current.clientHeight &&
        newsFeedEl.current.scrollTop > 0
      ) {
        rotateRefreshArrow(
          newsFeedEl.current.scrollTop,
          refreshLoaderEl.current.clientHeight
        );
      }
    }
  };

  const scrollNewsPageTo = position => {
    newsFeedEl.current.scrollTo({
      top: position
    });
  };

  const callRefreshLoader = () => {
    setNewsFeedLoading(true);
    setPageLoadingNumber(1);
    getNewsFeed(1);
  };

  const callLoadMoreLoader = () => {
    setBottomLoaderShowing(true);
    setNewsFeedLoading(true);
    getNewsFeed(pageLoadingNumber + 1);
    setPageLoadingNumber(pageLoadingNumber + 1);
  };

  const rotateRefreshArrow = (topOfScreen, refreshLoaderElHeight) => {
    refreshLoaderContainerEl.current.style.transform = `rotate(${360 -
      (topOfScreen / refreshLoaderElHeight) * 360}deg)`;
  };

  const stopInertiaScroll = scrollTop => {
    newsFeedEl.current.style.overflow = "hidden";
    newsFeedEl.current.scrollTop = scrollTop;
    setTimeout(function() {
      newsFeedEl.current.style.overflow = "";
    }, 40);
  };

  return (
    <React.Fragment>
      {isNewsFeedLoading && news.length === 0 ? (
        <div className="news-feed__loader-screen" style={newsFeedStyle}>
          <div className="news-feed__loader">
            <Loader themeStyle={themeStyle} />
          </div>
        </div>
      ) : (
        <div className="news-feed-container">
          <Header
            headerTitle={headerTitle}
            themeStyle={themeStyle}
            isNewsFeedShowing={isNewsFeedShowing}
            setNewsFeedShowing={setNewsFeedShowing}
            isNewsFeedLoading={isNewsFeedLoading}
            setNewsFeedLoading={setNewsFeedLoading}
            loadNewsFeed={getNewsFeed}
            setPageLoadingNumber={setPageLoadingNumber}
          />
          <div
            className="news-feed"
            style={newsFeedStyle}
            ref={newsFeedEl}
            onScroll={onScroll}
          >
            <div className="refresh-loader-container" ref={refreshLoaderEl}>
              <div className="refresh-loader" ref={refreshLoaderContainerEl}>
                {isNewsFeedLoading ? (
                  <Loader themeStyle={themeStyle} />
                ) : (
                  <RefreshLoader style={refreshLoaderStyle} />
                )}
              </div>
            </div>
            {news.map(newsItem => {
              return (
                <NewsItem
                  title={newsItem.title}
                  content={newsItem.content}
                  key={`${newsItem.id}${newsItem.title}`}
                  themeStyle={themeStyle}
                />
              );
            })}
            {isBottomLoaderShowing && (
              <div className="load-more-loader-container">
                <div className="load-more-loader">
                  <Loader themeStyle={themeStyle} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default NewsFeed;
