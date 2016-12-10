import * as React from "react";

import { Dispatcher, MsgHandlerId } from "../dispatcher";

interface WelcomeProps {
    dispatcher: Dispatcher
}

const showTimeout = 3; // seconds

export class Welcome extends React.Component<WelcomeProps, any> {
    private handerId: MsgHandlerId = null;
    private timeoutId: number = null;

    constructor(props: WelcomeProps) {
        super(props);
        this.state = {
            name: null,
            show: false
        }
    }

    private handleNameUpdate(data: any) {
        if (this.state.name === data.name) {
            return;
        }

        this.setState({
            name: data.name,
            show: true
        });

        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
            this.timeoutId = null;
            this.hideName();
        }, showTimeout * 1000);
    }

    private hideName() {
        this.setState((prevState, props) => {
           prevState.show = false;
           return prevState;
        });
    }

    componentDidMount() {
        this.handerId = this.props.dispatcher.on('update_name', data => this.handleNameUpdate(data));
    }

    componentWillUnmount() {
        this.props.dispatcher.clear('update_name', this.handerId);
    }

    render() {
        let visibility = this.state.name === null || !this.state.show ? 'welcome-hidden' : 'welcome-visible';

        return <div className="welcome">
            <div className={`welcome-text ${visibility}`}>Hi {this.state.name}!</div>
        </div>
    }
}