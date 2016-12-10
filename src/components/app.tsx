import * as React from "react";

import { Clock } from "./clock";
import { Dispatcher, MsgHandlerId } from "../dispatcher";
import { Welcome } from "./welcome";
import { Swapper } from "./swapper";
import { Weather } from "./weather";
import { Timetable } from "./timetable";

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
                <div>
                    <Clock printSeconds={false}/>
                    <Weather dispatcher={this.props.dispatcher}/>
                    <Timetable dispatcher={this.props.dispatcher}/>
                </div>
                <div className="twitter">
                    <h1>Twitter news feed</h1>
                    <p><b>Elon Musk</b> <span className="user">@elonmusk</span></p>
                    <p>Vote tally shows ~85% of unaffiliated shareholders in favor of the Tesla/SolarCity merger! Thanks for believing.</p>
                    <p><b>Bill Gates</b> <span className="user">@billgates</span></p>
                    <p>Our work is not possible without dedicated partners and staff around the world. We are happy to accept the Medal of Freedom on their behalf.</p>

                </div>
            </Swapper>
            <Welcome dispatcher={this.props.dispatcher}/>
        </div>;
    }
}