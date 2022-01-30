import React from "react";
import clas from "./news.module.scss";

let News = (props) => {
  return (
    <div className={clas.Main}>
      {props.DataNews.map((p) => (
        <div key={p._id} className={clas.item}>
          <h3 className={clas.Title}>{p.Title}</h3>
          <p className={clas.Text}>{p.Text}</p>
        </div>
      ))}
    </div>
  );
};

export default News;
