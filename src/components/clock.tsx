import * as React from "react";

interface Time {
    hour: number
    minute: number
    second: number
}

interface ClockProps {
    printSeconds: boolean
}

export class Clock extends React.Component<ClockProps, any> {
    private intervalHandler: number = null;
    public state: Time;

    constructor(props: ClockProps) {
        super(props);
        this.state = this.getTime();
    }

    private getTime(): Time {
        const date = new Date();
        return {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };
    }

    private tryUpdateState() {
        const time = this.getTime();
        this.setState(time);
    }

    componentDidMount() {
        this.intervalHandler = setInterval(() => this.tryUpdateState(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalHandler);
    }

    private static padNumber(n: number): string {
        let res = n.toString(10);
        if (res.length == 1) {
            return `0${res}`;
        }
        return res;
    }

    render() {
        let str = `${Clock.padNumber(this.state.hour)}:${Clock.padNumber(this.state.minute)}`;
        if (this.props.printSeconds) {
            str = `${str}:${Clock.padNumber(this.state.second)}`;
        }

        return <div className="clock">
            <div className="clock-digits">{str}</div>
        </div>;
    }
}