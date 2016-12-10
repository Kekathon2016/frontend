import * as React from "react";

import { Clock } from "./clock";
import { Dispatcher } from "../dispatcher";
import {Welcome} from "./welcome";

interface AppProps {
    dispatcher: Dispatcher
}

export class App extends React.Component<AppProps, any> {
    render() {
        return <div>
            <Clock printSeconds={false}/>
            <Welcome dispatcher={this.props.dispatcher}/>
        </div>;
    }
}