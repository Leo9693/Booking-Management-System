import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-block-ui/style.css";

// backup backend server
// axios.defaults.baseURL =
//     "http://handyman-cms.us-east-2.elasticbeanstalk.com/V1";

axios.defaults.baseURL = "https://booking-management-database.herokuapp.com/V1";
const baseURL = process.env.PUBLIC_URL || "";

ReactDOM.render(
    <Router basename={baseURL}>
        <App />
    </Router>,
    document.getElementById("root")
);
