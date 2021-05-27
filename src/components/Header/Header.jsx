import React from "react";

import Loader from "../Loader/Loader";

import { ReactComponent as ThemeTabLogo } from "../../assets/icons/palette.svg";
import { ReactComponent as NewsFeedTabLogo } from "../../assets/icons/list.svg";
import { ReactComponent as RefreshLoader } from "../../assets/icons/loading-arrow.svg";

import "./Header.scss";

const Header = ({
  themeStyle,
  headerTitle,
  isNewsFeedShowing,
  setNewsFeedShowing,
  isNewsFeedLoading,
  setNewsFeedLoading,
  loadNewsFeed,
  setPageLoadingNumber
}) => {
  const headerStyle = {
    backgroundColor: themeStyle.secondColor
  };

  const iconStyle = {
    fill: themeStyle.mainColor
  };

  const headerLoaderStyle = { secondColor: themeStyle.mainColor };

  return (
    <header className="header" style={headerStyle}>
      {headerTitle}
      {isNewsFeedShowing ? (
        <div className="buttons-container">
          <div className="button-news-feed">
            <ThemeTabLogo
              onClick={() => {
                setNewsFeedShowing(false);
              }}
              style={iconStyle}
            />
          </div>
          {isNewsFeedLoading ? (
            <div className="header-refresh-loader">
              <Loader themeStyle={headerLoaderStyle} />
            </div>
          ) : (
            <div className="button-news-feed">
              <RefreshLoader
                onClick={() => {
                  setNewsFeedLoading(true);
                  setPageLoadingNumber(1);
                  loadNewsFeed(1);
                }}
                style={iconStyle}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="button-themes">
          <NewsFeedTabLogo
            onClick={() => {
              setNewsFeedShowing(true);
            }}
            style={iconStyle}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
