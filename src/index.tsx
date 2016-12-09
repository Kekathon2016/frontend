import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/app";

import { Connection, ConnectionState } from "./connection";

const connection = new Connection('ws://52.178.154.133:8080');

connection.onstatechange = state => {
    console.log("connection state", ConnectionState[state]);
};

connection.onmessage = msg => {
    console.log("message", msg);
};

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);
