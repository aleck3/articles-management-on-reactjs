import React from "react";
import { useLocation, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface LocationState {
  image: string | null;
  title: string;
  content: string;
}

const ArticlePage: React.FC = () => {
  const location = useLocation();
  const { image, title, content } = location.state as LocationState;
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          width: "auto",
          height: "245px",
        }}
      />
      <Box
        sx={{
          backgroundColor: "#FFF",
          width: "1280px",
          mx: "auto",
          mt: "-150px",
          boxShadow: 6,
          borderRadius: 1,
          paddingX: "75px",
          paddingBottom: "50px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            paddingTop: "35px",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          {title}
        </h2>
        <p>{content}</p>
        <p>
          <i>This content truncated to 200 chars by News API.</i>
        </p>
      </Box>
      <Link to="/home" style={{ textDecoration: "none" }}>
        <p style={{ marginLeft: "120px", marginTop: "35px" }}>
          <ArrowBackIcon />
          <strong>Back to homepage</strong>
        </p>
      </Link>
    </Box>
  );
};
export default ArticlePage;
