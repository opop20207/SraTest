import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
    <MoralisProvider
        appId="xdtQW4Rhkc0GvRzudL16sGGaO2fadoqESl8fkwIJ"
        serverUrl="https://k4lt9sbz1oni.usemoralis.com:2053/server">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </MoralisProvider>,

    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
