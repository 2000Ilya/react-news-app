import "./Footer.scss";

import { ReactComponent as ThemeTabLogo } from "../../assets/icons/palette.svg";
import { ReactComponent as NewsFeedTabLogo } from "../../assets/icons/list.svg";

const Footer = ({ themeStyle, setNewsFeedShowing }) => {
  const footerStyle = {
    backgroundColor: themeStyle.secondColor,
    fill: themeStyle.mainColor
  };

  return (
    <footer className="footer" style={footerStyle}>
      <NewsFeedTabLogo
        onClick={() => {
          setNewsFeedShowing(true);
        }}
        className="tab-themes"
        style={footerStyle}
      />
      <ThemeTabLogo
        onClick={() => {
          setNewsFeedShowing(false);
        }}
        className="tab-news-feed"
        style={footerStyle}
      />
    </footer>
  );
};

export default Footer;
