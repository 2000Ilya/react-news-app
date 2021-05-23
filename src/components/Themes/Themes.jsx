import "./Themes.scss";

const Themes = ({ changeTheme, themeStyle }) => {
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

  return (
    <div className="themes" style={themesStyle}>
      {themeButtons.map(themeButton => {
        return (
          <button
            onClick={() => changeTheme(themeButton.themeName)}
            className="theme-button"
            style={themeButtonStyle}
            key={themeButton.id}
          >
            {themeButton.text}
          </button>
        );
      })}
    </div>
  );
};

export default Themes;
