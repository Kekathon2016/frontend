import * as React from "react";

import { Clock } from "./clock";
import { Dispatcher, MsgHandlerId } from "../dispatcher";
import { Welcome } from "./welcome";
import { Swapper } from "./swapper";

interface AppProps {
    dispatcher: Dispatcher
}

export class App extends React.Component<AppProps, any> {
    private handlerId: MsgHandlerId = null;

    constructor(props: AppProps) {
        super(props);
        this.state = {visible: false};
    }

    private setVisibility(visible: boolean) {
        this.setState({visible});
    }

    componentDidMount() {
        this.handlerId = this.props.dispatcher.on('visible', data => this.setVisibility(data));
    }

    componentWillUnmount() {
        this.props.dispatcher.clear('visible', this.handlerId);
    }

    render() {
        return <div className={this.state.visible ? 'app-visible' : 'app-hidden'}>
            <Swapper dispatcher={this.props.dispatcher}>
                <Clock printSeconds={false}/>
                <div>asdasd</div>
            </Swapper>
            <Welcome dispatcher={this.props.dispatcher}/>
        </div>;
    }
}