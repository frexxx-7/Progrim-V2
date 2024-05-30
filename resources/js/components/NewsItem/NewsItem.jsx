import React from 'react'
import classes from './NewsItem.module.scss'

const NewsItem = ({ data }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <div className={classes.container}>
      <a href={data.url}>
        <div className={classes.image_container}>
          <img src={data.urlToImage} alt="" />
        </div>

        <div className={classes.news_info}>
          <p className={classes.news_author}>Автор: {data.author}</p>
          <p className={classes.news_title}>{data.title}</p>
          <p className={classes.news_date}>{formatDate(data.publishedAt)}</p>
        </div>
      </a>
    </div>
  )
}

export default NewsItem