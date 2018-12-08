import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import request, { post } from 'request';

interface IMemoryUsage {
    usage: string;
    timestamp: string;
}

interface IState {
    memoryUsageData?: IMemoryUsage[];
    startTime?: number;
    endTime?: number;
}

class MemoryUsageChart extends Component<any, IState> {
    constructor(props){
        super(props);

        this.state = {
            memoryUsageData: [],
            startTime: -Infinity,
            endTime: Infinity,
        };
    }
    public componentDidMount() {
        request.post('/fetchMemoryUsage', {
            start: 1544074441873,
        }, (data: IMemoryUsage[]) => {
            this.setState({ memoryUsageData: data });
        })
    }

    public render () {
        console.log({state: this.state});
        const rows = this.state.memoryUsageData.map(({ usage, timestamp }) => {
            <div>
                <div>{usage}</div>
                <div>{timestamp}</div>
            </div>
        });

        return <div>{...rows}</div>;
    }
}

ReactDOM.render(<MemoryUsageChart />, document.getElementById('app-root'));
