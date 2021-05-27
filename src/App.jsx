import { useEffect, useState } from "react";

import NewsFeed from "./components/NewsFeed/NewsFeed";
import Footer from "./components/Footer/Footer";
import Themes from "./components/Themes/Themes";
import Loader from "./components/Loader/Loader";

import { getTheme } from "./api";

import "./App.scss";

const App = () => {
  const [isThemeLoading, setThemeLoading] = useState(true);
  const [theme, setTheme] = useState(
    localStorage.theme === undefined ? {} : JSON.parse(localStorage.theme)
  );
  const [isNewsFeedShowing, setNewsFeedShowing] = useState(
    localStorage.isNewsFeedShowing === undefined
      ? true
      : JSON.parse(localStorage.isNewsFeedShowing)
  );
  const [themeName, setThemeName] = useState(
    localStorage.themeName === undefined ? "light" : localStorage.themeName
  );

  const appStyle = {
    color: theme.textColor
  };

  useEffect(() => {
    loadTheme(themeName);
  }, [themeName]);

  const loadTheme = themeName => {
    getTheme(themeName)
      .then(resolve => {
        setTheme(resolve);
        localStorage.theme = JSON.stringify(resolve);
      })
      .catch(error => console.error(error))
      .then(() => {
        setThemeLoading(false);
      });
  };

  const changeDisplayShowing = isNewsFeedShowing => {
    setNewsFeedShowing(isNewsFeedShowing);
    localStorage.isNewsFeedShowing = JSON.stringify(isNewsFeedShowing);
  };

  const changeTheme = themeName => {
    setThemeName(themeName);
    localStorage.themeName = themeName;
  };

  return isThemeLoading && isNewsFeedShowing ? (
    <div className="loader-screen">
      <div className="full-screen-loader">
        <Loader themeStyle={{ secondColor: "white" }} />
      </div>
    </div>
  ) : (
    <div className="App" style={appStyle}>
      {isNewsFeedShowing ? (
        <NewsFeed
          themeStyle={theme}
          isNewsFeedShowing={isNewsFeedShowing}
          setNewsFeedShowing={setNewsFeedShowing}
        />
      ) : (
        <Themes
          themeStyle={theme}
          changeTheme={changeTheme}
          isThemeLoading={isThemeLoading}
          setThemeLoading={setThemeLoading}
          isNewsFeedShowing={isNewsFeedShowing}
          setNewsFeedShowing={setNewsFeedShowing}
        />
      )}
      <Footer themeStyle={theme} setNewsFeedShowing={changeDisplayShowing} />
    </div>
  );
};

export default App;
