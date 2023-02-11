import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
    <Router>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
            <App />
        </GoogleOAuthProvider>
    </Router>, document.getElementById('root'));