import { useState } from "react";

import Loader from "../Loader/Loader";
import Header from "../../components/Header/Header";

import "./Themes.scss";

const Themes = ({
  changeTheme,
  themeStyle,
  isThemeLoading,
  setThemeLoading,
  isNewsFeedShowing,
  setNewsFeedShowing
}) => {
  const [lastThemeSelected, setLastThemeSelected] = useState(themeStyle.name);

  const headerTitle = isNewsFeedShowing ? "Новости" : "Темы";

  const themesStyle = {
    backgroundColor: themeStyle.mainColor
  };

  const themeButtonStyle = {
    borderColor: themeStyle.secondColor,
    backgroundColor: themeStyle.mainColor,
    color: themeStyle.textColor
  };

  const themeButtons = [
    { text: "Светлая", themeName: "light", id: 1 },
    { text: "Темная", themeName: "dark", id: 2 },
    { text: "Синяя", themeName: "blue", id: 3 }
  ];

  const loadTheme = themeName => {
    if (themeName !== lastThemeSelected) {
      setLastThemeSelected(themeName);
      setThemeLoading(true);
      changeTheme(themeName);
    }
  };

  return (
    <div className="themes-container">
      <Header
        headerTitle={headerTitle}
        themeStyle={themeStyle}
        isNewsFeedShowing={isNewsFeedShowing}
        setNewsFeedShowing={setNewsFeedShowing}
      />
      <div className="themes" style={themesStyle}>
        {themeButtons.map(themeButton => {
          return (
            <button
              onClick={() => loadTheme(themeButton.themeName)}
              className="theme-button"
              style={themeButtonStyle}
              key={themeButton.id}
              disabled={isThemeLoading}
            >
              {themeButton.text}
              {isThemeLoading && themeButton.themeName === lastThemeSelected ? (
                <div className="button-loader">
                  <Loader themeStyle={themeStyle} />
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Themes;
