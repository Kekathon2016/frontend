import * as React from "react";

import { Dispatcher, MsgHandlerId } from "../dispatcher";
import Skycons from "react-skycons";

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
            weather: data.currently
        })
    }

    componentDidMount() {
        this.handlerId = this.props.dispatcher.on('weather', data => this.handleWeatherUpdate(data));
    }

    componentWillUnmount() {
        this.props.dispatcher.clear('weather', this.handlerId);
    }

    private static fixIconName(name: string): string {
        return name.toUpperCase().replace(/-/g, '_');
    }

    render() {
        if (this.state.weather === null) {
            return null;
        }

        return <div className="weather">
            <div className="weather-skycon">
                <Skycons color='white' icon={Weather.fixIconName(this.state.weather.icon)} />
            </div>
            <div className="weather-temperature">{this.state.weather.temperature | 0}°</div>
            <div className="weather-summary">{this.state.weather.summary}</div>
            <div className="weather-wind">Wind: {this.state.weather.windSpeed} km/h</div>
        </div>
    }
}