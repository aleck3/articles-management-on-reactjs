import React from "react";
import { Link } from "react-router-dom";

const Article = (props) => {
  const index = props.title.toLowerCase().indexOf(props.keyword);
  let title = props.title;
  if (index > 0) {
    title = (
      <div>
        {props.title.substring(0, index)}
        <span style={{ backgroundColor: "yellow" }}>
          {props.title.substring(index, index + props.keyword.length)}
        </span>
        {props.title.substring(index + props.keyword.length)};
      </div>
    );
  }
  return (
    <div>
      <li>
        <Link
          to={`/articlepage/${props.articleId}`}
          state={{
            title: props.title,
            image: props.image,
            content: props.content,
          }}
        >
          <h2>{title}</h2>
          {props.image !== null && (
            <img
              src={props.image}
              style={{ display: "block", width: "300px" }}
              alt="title article pic"
            ></img>
          )}
          <p>{props.publishedAt}</p>
          <p>{props.description}</p>
          <p>Read More</p>
        </Link>
      </li>
    </div>
  );
};

export default Article;
