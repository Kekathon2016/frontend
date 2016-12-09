import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/app";

import { Connection, ConnectionState } from "./connection";

import { Dispatcher } from "./dispatcher";

const connection = new Connection('ws://52.178.154.133:8080');
const dispatcher = new Dispatcher();

dispatcher.on('ping', () => {});

connection.onstatechange = state => {
    console.info("connection state", ConnectionState[state]);
};

connection.onmessage = msg => {
    dispatcher.dispatch(msg);
};

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);

connection.start();
