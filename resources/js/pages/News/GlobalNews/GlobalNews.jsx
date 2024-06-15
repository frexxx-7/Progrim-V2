import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import classes from '../News.module.scss';
import NewsItem from '../../../components/NewsItem/NewsItem';

const GlobalNews = () => {
  const [news, setNews] = useState([]);
  const [word, setWord] = useState("программирование");
  const [sortBy, setSortBy] = useState('publishedAt');
  const [language, setLanguage] = useState('ru');
  const { t } = useTranslation()
  const [pageTitle, setPageTitle] = useState(t("news.titleGl"))

  const optionsSort = [
    { value: 'publishedAt', label: 'Дата публикации' },
    { value: 'relevancy', label: 'Актуальность' },
    { value: 'popularity', label: 'Популярность' },
  ];

  const optionsLang = [
    { value: 'ru', label: 'Русский' },
    { value: 'ar', label: 'Арабский' },
    { value: 'de', label: 'Немецкий' },
    { value: 'en', label: 'Английский' },
    { value: 'es', label: 'Испанский' },
    { value: 'fr', label: 'Французский' },
    { value: 'he', label: 'Иврит' },
    { value: 'it', label: 'Итальянский' },
    { value: 'nl', label: 'Голландский' },
    { value: 'no', label: 'Норвежский' },
    { value: 'pt', label: 'Португальский' },
    { value: 'sv', label: 'Шведский' },
    { value: 'ud', label: 'Удмуртский' },
    { value: 'zh', label: 'Китайский' },
  ];

  const handleChangeSort = (event) => {
    setSortBy(event.target.value);
  };

  const handleChangeLang = (event) => {
    setLanguage(event.target.value);
  };

  const getNews = () => {
    axios.get(`https://newsapi.org/v2/everything?q=${word}&sortBy=${sortBy}&language=${language}&apiKey=27dd23bfe3bb442aa18f97585ce4198a`, {
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
        <h1>{pageTitle}</h1>
      </div>
      <div className={classes.filterPanel}>
        <div className={classes.word}>
          <p>{t("news.keyword")}:</p>
          <input type="text" value={word} onChange={handleInputChange} />
        </div>

        <div className={classes.sortBy}>
          <label htmlFor="sort-by">{t("news.sortby")}:</label>
          <div className={classes.select}>

            <select id="sort-by" value={sortBy} onChange={handleChangeSort}>
              {optionsSort.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className={classes.select_arrow}>
            </div>
          </div>
        </div>

        <div className={classes.sortBy}>
          <label htmlFor="lang">{t("news.selectLang")}:</label>
          <div className={classes.select}>

            <select id="lang" value={language} onChange={handleChangeLang}>
              {optionsLang.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className={classes.select_arrow}>
            </div>
          </div>


        </div>

        <div className={classes.searchButton}>
          <div className={classes.searchContainer} onClick={() => getNews()}>
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
  )
}

export default GlobalNews