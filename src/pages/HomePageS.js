import React, { useState, useEffect, useCallback } from "react";

import ArticlesList from "../components/ArticlesList";
import SearchForm from "../components/SearchForm";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState(" ");
  const changeWordHandler = (word) => {
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
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);

      const loadArticles = [];

      for (const key in data.articles) {
        loadArticles.push({
          id: key,
          image: data.articles[key].urlToImage,
          publishedAt: data.articles[key].publishedAt,
          title: data.articles[key].title,
          description: data.articles[key].content.slice(0, 100),
          content: data.articles[key].content,
          url: data.articles[key].url,
        });
      }
      setArticles(loadArticles);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [keyword]);

  useEffect(() => {
    fetchArticlesHandler();
  }, [fetchArticlesHandler]);

  let content = <p>Found no Articles.</p>;

  if (articles.length > 0) {
    content = (
      <ArticlesList articles={articles} keyword={keyword.toLowerCase()} />
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <SearchForm keywordChangeHandler={changeWordHandler} />
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
};
export default HomePage;
