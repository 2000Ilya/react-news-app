import { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import Footer from "./components/Footer/Footer";
import Themes from "./components/Themes/Themes";

import { getTheme } from "./api";

import "./App.scss";

const App = () => {
  const [theme, setTheme] = useState({});
  const [isNewsFeedShowing, setNewsFeedShowing] = useState(true);
  const [themeName, setThemeName] = useState("light");

  const appStyle = {
    color: theme.textColor
  };

  const headerTitle = isNewsFeedShowing ? "Новости" : "Темы";

  useEffect(() => {
    getTheme(themeName).then(setTheme);
  }, [themeName]);

  const changeDisplayShowing = isNewsFeedShowing => {
    setNewsFeedShowing(isNewsFeedShowing);
  };

  const changeTheme = themeName => {
    setThemeName(themeName);
  };

  return (
    <div className="App" style={appStyle}>
      <Header headerTitle={headerTitle} themeStyle={theme} />
      {isNewsFeedShowing ? (
        <NewsFeed themeStyle={theme} />
      ) : (
        <Themes themeStyle={theme} changeTheme={changeTheme} />
      )}
      <Footer themeStyle={theme} setNewsFeedShowing={changeDisplayShowing} />
    </div>
  );
};

export default App;
