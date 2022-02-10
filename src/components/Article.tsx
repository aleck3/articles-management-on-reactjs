// import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import Box from "@mui/material/Box";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Article: React.FC<{
  image: string | null;
  publishedAt: string;
  title: string;
  description: string;
  content: string;
  keyword: string;
  articleId: string;
  url: string;
}> = (props) => {
  const word = new RegExp(`(\\b${props.keyword}\\b)`, "gi");
  console.log(word);
  const title = (
    <h4>
      {reactStringReplace(props.title, word, (match, i) => (
        <span style={{ backgroundColor: "yellow" }}>{match}</span>
      ))}
    </h4>
  );

  const description = (
    <p>
      {reactStringReplace(props.description, word, (match, i) => (
        <span style={{ backgroundColor: "yellow" }}>{match}</span>
      ))}
    </p>
  );
  console.log(props.keyword);
  return (
    <Box
      sx={{
        height: 530,
        marginRight: "45px",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#eaeaea",
        boxShadow: 6,
        borderRadius: 1,
        marginBottom: "45px",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <Link
        to={`/articlepage/${props.articleId}`}
        state={{
          title: props.title,
          image: props.image,
          content: props.content,
        }}
        style={{ textDecoration: "none" }}
      >
        {props.image !== null ? (
          <img
            src={props.image}
            style={{ display: "block", width: "100%", height: "217px" }}
            alt="title article pic"
          ></img>
        ) : (
          <div style={{ width: "100%", height: "217px" }}></div>
        )}
        <Box sx={{ mx: "25px" }}>
          <p style={{ fontSize: "14px", color: "#363636" }}>
            <CalendarTodayIcon sx={{ mr: "15px" }} />
            {props.publishedAt}
          </p>
          {title}
          {description}
          <p>
            <strong>Read More</strong>
            <ArrowForwardIcon />
          </p>
        </Box>
      </Link>
    </Box>
  );
};

export default Article;
