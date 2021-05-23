import "./NewsItem.scss";

const NewsItem = ({ title, content }) => {
  return (
    <div className="news-item">
      <b className="news-item__title">{title}</b>
      <p className="news-item__content">{content}</p>
    </div>
  );
};

export default NewsItem;
