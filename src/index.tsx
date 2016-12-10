import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";
import { Connection, ConnectionState } from "./connection";
import { Dispatcher } from "./dispatcher";

const dispatcher = new Dispatcher();

dispatcher.on('ping', () => {});

const connection = new Connection('ws://52.178.154.133:8080');

connection.onstatechange = state => {
    console.info("connection state", ConnectionState[state]);
};

connection.onmessage = msg => {
    dispatcher.dispatch(msg);
};

const weatherConnection = new Connection('ws://52.178.154.133:8081');

weatherConnection.onstatechange = state => {
    console.info("weather connection state", ConnectionState[state]);
};

weatherConnection.onmessage = msg => {
    dispatcher.dispatch(msg);
};

ReactDOM.render(
    <App dispatcher={dispatcher}/>,
    document.getElementById('app')
);

connection.start();

weatherConnection.start();

// Simple function to push messages to system. For debugging purposes.
(window as any)['dispatch'] = (type: string, data: any) => {
    dispatcher.dispatch({
        type: type,
        data: data
    });
};