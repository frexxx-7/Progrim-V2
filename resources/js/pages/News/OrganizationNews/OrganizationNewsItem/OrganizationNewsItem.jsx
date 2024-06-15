import React from 'react'
import classes from './OrganizationNewsItem.module.scss'
import { Link } from 'react-router-dom'

const OrganizationNewsItem = ({ data }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className={classes.container}>
      <Link to={`/news/organization/${data.idOrganization}/${data.id}`}>
        <div className={classes.image_container}>
          {data.image && <img src={'/storage/'+data.image} alt="" />}
        </div>

        <div className={classes.news_info}>
          <p className={classes.news_title}>{data.title}</p>
          <p className={classes.news_date}>{formatDate(data.created_at)}</p>
        </div>
      </Link>
    </div>
  )
}

export default OrganizationNewsItem