import * as React from "react";
import * as ReactDOM from "react-dom";

import { Executor } from "./executor";

import { Hello } from "./components/Hello";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);

const executor = new Executor(1000, () => {
    console.log("lol");
});

executor.start();
setTimeout(() => executor.stop(), 5000);