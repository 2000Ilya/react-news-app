import "./Header.scss";

const Header = ({ themeStyle, headerTitle }) => {
  const headerStyle = {
    backgroundColor: themeStyle.secondColor
  };

  return (
    <header className="header" style={headerStyle}>
      {headerTitle}
    </header>
  );
};

export default Header;
