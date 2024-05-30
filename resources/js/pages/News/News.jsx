import React, { useEffect, useState, useRef } from 'react';
import classes from './News.module.scss';
import axios from 'axios';
import NewsItem from '../../components/NewsItem/NewsItem';

const News = () => {
  const [news, setNews] = useState([]);
  const [word, setWord] = useState("программирование");

  const getNews = () => {
    axios.get(`https://newsapi.org/v2/everything?q=${word}&sortBy=publishedAt&language=ru&apiKey=27dd23bfe3bb442aa18f97585ce4198a`, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  const handleInputChange = (event) => {
    setWord(event.target.value);
  };

  return (
    <div className={classes.mainContent}>
      <div className={classes.pageTitle}>
        <h1>Новости</h1>
      </div>

      <div className={classes.filterPanel}>
        <div className={classes.word}>
          <p>Ключевое слово:</p>
          <input type="text" value={word} onChange={handleInputChange} />
        </div>

        <div className={classes.searchButton}>
          <div className={classes.searchContainer} onClick={()=>getNews()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className={classes.newsContent}>
        {news && news.map((item, key) =>
          item.urlToImage && item.author &&
          <NewsItem data={item} key={key} />
        )}
      </div>
    </div>
  );
};

export default News;
