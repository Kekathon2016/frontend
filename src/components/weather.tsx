import * as React from "react";

import { Dispatcher, MsgHandlerId } from "../dispatcher";

interface WeatherProps {
    dispatcher: Dispatcher
}

export class Weather extends React.Component<WeatherProps, any> {
    private handlerId: MsgHandlerId = null;

    constructor(props: WeatherProps) {
        super(props);
        this.state = {
            weather: null
        }
    }

    private handleWeatherUpdate(data: any) {
        this.setState({
            weather: data
        })
    }

    componentDidMount() {
        this.handlerId = this.props.dispatcher.on('weather', data => this.handleWeatherUpdate(data));
    }

    componentWillUnmount() {
        this.props.dispatcher.clear('weather', this.handlerId);
    }

    render() {
        if (this.state.weather === null) {
            return null;
        }

        return <div className="weather">
            {this.state.weather.currently.summary}
        </div>
    }
}