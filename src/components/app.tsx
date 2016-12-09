import * as React from "react";

import { Clock } from "./clock";

interface AppProps {
}

export class App extends React.Component<AppProps, any> {
    render() {
        return <Clock printSeconds={false}/>
    }
}