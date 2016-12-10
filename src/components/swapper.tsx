import * as React from "react";

import { Dispatcher, MsgHandlerId } from "../dispatcher";
import ReactNode = React.ReactNode;

interface SwapperProps {
    dispatcher: Dispatcher
    children?: React.ReactNode
}

export class Swapper extends React.Component<SwapperProps, any> {
    private handlerId: MsgHandlerId = null;

    constructor(props: SwapperProps) {
        super(props);
        this.state = {
            viewNum: 0
        }
    }

    private handleSwipe(data: any) {
        let dir: number = 0;
        switch (data.direction) {
            case 'left': dir = 1; break;
            case 'right': dir = -1; break;
        }
        const numChildren = React.Children.count(this.props.children);
        this.setState((prevState, props) => ({
            viewNum: (prevState.viewNum + dir + numChildren) % numChildren
        }));
    }

    componentDidMount() {
        this.handlerId = this.props.dispatcher.on('swipe', data => this.handleSwipe(data));
    }

    componentWillUnmount() {
        this.props.dispatcher.clear('swipe', this.handlerId);
    }

    render() {
        const children = React.Children.map(this.props.children, (child: React.ReactChild, idx: number) =>
            <div className="swapper-elem" key={idx} style={{
                left: `${(idx - this.state.viewNum) * 100}%`
            }}>
                {child}
            </div>
        );

        return <div className="swapper-box">
            {children}
        </div>
    }
}