import { Link } from "react-router-dom";
const NotFound = () => {
    return(
        <div style={{textAlign: "center"}}>
          <h2>Page not found!</h2>
          <Link to="/home"><p>Back to homepage</p></Link>
        </div>
    );
};

export default NotFound;