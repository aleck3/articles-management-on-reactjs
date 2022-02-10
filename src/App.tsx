import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />}></Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/articlepage" element={<Navigate to={"/home"} />} />
        <Route path="/articlepage/:articleId" element={<ArticlePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>  
  );
}

export default App;
