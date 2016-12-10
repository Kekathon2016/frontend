import * as React from "react";
import { Dispatcher, MsgHandlerId } from "../dispatcher";

interface WelcomeProps {
    dispatcher: Dispatcher
}

export class Timetable extends React.Component<WelcomeProps, any> {
    private handlerId: MsgHandlerId = null;
    private timeoutId: number = null;

    constructor(props: WelcomeProps) {
        super(props);
        this.state = {
            show: false
        }
    }

    private handleNameUpdate(data: any) {
        this.setState({
            show: data
        });
    }

    private hideName() {
        this.setState((prevState, props) => {
           prevState.show = false;
           return prevState;
        });
    }

    componentDidMount() {
        this.handlerId = this.props.dispatcher.on('show_table', data => this.handleNameUpdate(data));
    }

    componentWillUnmount() {
        this.props.dispatcher.clear('show_table', this.handlerId);
    }

    render() {
        let visibility = !this.state.show ? 'timetable-hidden' : 'timetable-visible';
        return <div className="timetable">
            <div className={`timetable-text ${visibility}`} id="slide">
                <p>Timetable:</p>
                tram 24 leaves in 2 minutes from sw. Wawrzynca<br/>
                tram 19 leaves in 5 minutes from sw. Wawrzynca<br/>
                tram 3 leaves in 7 minutes from sw. Wawrzynca
            </div>
        </div>
    }
}