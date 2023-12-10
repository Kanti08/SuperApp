import React, { useState, useEffect } from "react";
import style from "./News.module.css";
import NewsDefault from "../../Assets/newsdefault.jpg";

function News() {
  const [newsData, setNewsData] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=tesla&from=2023-11-04&sortBy=publishedAt&apiKey=1d43133c0e204e92a67c914da770465d"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setNewsData(data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    }, 19000);

    return () => clearInterval(intervalId);
  }, [currentNewsIndex, newsData]);

  const getImageUrl = (article) => {
    return article && article.urlToImage ? article.urlToImage : NewsDefault;
  };

  return (
    <div className={style.newscontainer}>
      {newsData.length > 0 && (
        <div key={newsData[currentNewsIndex].id}>
          <div className={style.news}>
            <img src={getImageUrl(newsData[currentNewsIndex])} alt="" />
            <div className={style.newsinfo}>
              <p className={style.newstitle}>
                {newsData[currentNewsIndex].title}
              </p>
              <p className={style.newsdate}>
                {newsData[currentNewsIndex].publishedAt}
              </p>
            </div>
          </div>
          <div className={style.newsdescription}>
            <p>{newsData[currentNewsIndex].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;
