import React, { useState, useEffect, useCallback } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

import ArticlesList from "../components/ArticlesList";
import SearchForm from "../components/SearchForm";

const HomePage = () => {
  const [articles, setArticles] = useState<
    | {
        id: string;
        wordRateTitle: number;
        wordRateDescription: number;
        image: string | null;
        publishedAt: string;
        title: string;
        description: string;
        content: string;
        url: string;
      }[]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [keyword, setKeyword] = useState<string>("");
  const changeWordHandler = (word: string | "") => {
    setKeyword(word);
  };
  const fetchArticlesHandler = useCallback(async () => {
    const today = new Date().toISOString().slice(0, 10);
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${keyword}&from=${today}&sortBy=relevancy&apiKey=732f4ceff198453da2137c3d239a4181`
      );
      if (!response.ok) {
        throw new Error("Enter a word for search, please");
      }

      const data = await response.json();

      const loadArticles: {
        id: string;
        wordRateTitle: number;
        wordRateDescription: number;
        image: string | null;
        publishedAt: string;
        title: string;
        description: string;
        content: string;
        url: string;
      }[] = [];

      for (const key in data.articles) {
        let patternKeyword: RegExp = new RegExp(`(\\b${keyword}\\b)`, "gi");
        console.log(patternKeyword);
        patternKeyword = new RegExp(patternKeyword, "gi");

        let keywordTitleLength: number;
        let keywordDescriptionLength: number;
        let keywordTitleCount = data.articles[key].title.match(patternKeyword);
        keywordTitleCount !== null
          ? (keywordTitleLength = keywordTitleCount.length)
          : (keywordTitleLength = 0);

        let keywordDescriptionCount = data.articles[key].description
          .slice(0, 100)
          .match(patternKeyword);
        keywordDescriptionCount !== null
          ? (keywordDescriptionLength = keywordDescriptionCount.length)
          : (keywordDescriptionLength = 0);

        loadArticles.push({
          id: key,
          wordRateTitle: keywordTitleLength,
          wordRateDescription: keywordDescriptionLength,
          image: data.articles[key].urlToImage,
          publishedAt: data.articles[key].publishedAt,
          title: data.articles[key].title,
          description: data.articles[key].description.slice(0, 100),
          content: data.articles[key].content,
          url: data.articles[key].url,
        });
      }

      setArticles(loadArticles);
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [keyword]);

  useEffect(() => {
    fetchArticlesHandler();
  }, [fetchArticlesHandler]);

  const sortedArticles = [...articles];
  sortedArticles.sort(function (a, b) {
    if (a.wordRateTitle === b.wordRateTitle) {
      return b.wordRateDescription - a.wordRateDescription;
    }
    return b.wordRateTitle - a.wordRateTitle;
  });
  console.log(sortedArticles);
  let content = <p>Found no Articles.</p>;

  if (articles.length > 0) {
    content = (
      <ArticlesList articles={sortedArticles} keyword={keyword.toLowerCase()} />
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <CircularProgress />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container sx={{ minWidth: 1290 }}>
        <SearchForm keywordChangeHandler={changeWordHandler} />
        <h4>Results:{articles.length}</h4>
        <Divider />
        <section>{content}</section>
      </Container>
    </React.Fragment>
  );
};
export default HomePage;
