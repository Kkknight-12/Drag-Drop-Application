import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css"
//
import App from "./App";

import store from "./store";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Router>
                <App />
            </Router>
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);