import React from "react";
import Grid from "@mui/material/Grid";

import Article from "./Article";
import ArticleListModel from "../models/articleLIstModel";;

const ArticleList: React.FC<{articles: ArticleListModel[]; keyword: string}> = (props) => {
  return (
    <Grid container sx={{marginTop: "45px"}}>
      {props.articles.map((article) => (
        <Grid item xs={4}>
          <Article
            key={article.id}
            articleId={article.id}
            image={article.image}
            publishedAt={article.publishedAt}
            title={article.title}
            description={article.description}
            content={article.content}
            url={article.url}
            keyword={props.keyword}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticleList;
